import Foundation
import Vision

@objc(RnOcrLib)
class RnOcrLib: RCTEventEmitter {
  let C_FINISHED_EVENT: String = "finished";
  let C_PROGRESS_EVENT: String = "progress";

  override func supportedEvents() -> [String]! {
    return [C_FINISHED_EVENT, C_PROGRESS_EVENT]
  }

  @objc(getText:withOcrInputType:withOcrOptions:withResolver:withRejecter:)
  func getText(data: String, ocrInputType: String, ocrOptions: NSDictionary, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    let scanImage: UIImage? = ocrInputType == "BASE64" ? convertBase64StringToImage(imageBase64String: data) : UIImage(contentsOfFile: data)

    guard let cgImage = scanImage?.cgImage else {
      return
    }

    let requestHandler = VNImageRequestHandler(cgImage: cgImage)

    let request = VNRecognizeTextRequest(completionHandler: recognizeTextHandler)

    if let lang = ocrOptions.value(forKey: "lang") as? [String] {
      request.recognitionLanguages = lang
    }

    if let ocrEngineMode = ocrOptions.value(forKey: "ocrEngineMode") as? Int {
      request.recognitionLevel = ocrEngineMode == 0 ? .fast : .accurate
    }

    request.progressHandler = recognizeProgressHandler(request:progress:error:)

    do {
      try requestHandler.perform([request])
      resolve("")
    } catch {
      reject("ocr_error", "Unable to perform the requests: \(error).", nil)
    }
  }

  func convertBase64StringToImage (imageBase64String: String) -> UIImage? {
    if let imageData = Data(base64Encoded: imageBase64String) {
      let image = UIImage(data: imageData)
      return image!
    }
    
    return nil
  }

  func recognizeProgressHandler(request: VNRequest, progress: Double, error: Error?) -> Void {
    self.sendEvent(withName: C_PROGRESS_EVENT, body: ["percent": progress * 100])
  }

  func recognizeTextHandler(request: VNRequest, error: Error?) -> Void {
    guard let observations =
      request.results as? [VNRecognizedTextObservation] else {
      return
    }

    let recognizedStrings = observations.compactMap { observation in
        // Return the string of the top VNRecognizedText instance.
      return observation.topCandidates(1).first?.string
    }

    let recognizedString = recognizedStrings.joined(separator: "\n")
    
    self.sendEvent(withName: C_FINISHED_EVENT, body: ["text": recognizedString])
  }
}
