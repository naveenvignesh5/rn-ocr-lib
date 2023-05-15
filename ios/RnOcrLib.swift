import Foundation
import Vision

@objc(RnOcrLib)
class RnOcrLib: RCTEventEmitter {
  let C_FINISHED_EVENT: String = "finished";
  let C_PROGRESS_EVENT: String = "progress";

  override func supportedEvents() -> [String]! {
    return [C_FINISHED_EVENT, C_PROGRESS_EVENT]
  }

  // @objc(multiply:withB:withResolver:withRejecter:)
  // func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
  //   resolve(a*b)
  // }

  @objc(getText:withOcrInputType:withOcrOptions:withResolver:withRejecter:)
  func getText(data: String, ocrInputType: String, ocrOptions: NSDictionary, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    print("data", data)
    print("ocrInputType", ocrInputType)
    print("ocrInputType", ocrOptions)

    let scanImage: UIImage? = ocrInputType == "Base64" ? convertBase64StringToImage(imageBase64String: data) : UIImage(contentsOfFile: data)

    guard let cgImage = scanImage?.cgImage else { return }

    let requestHandler = VNImageRequestHandler(cgImage: cgImage)

    // Create a new request to recognize text.
    let request = VNRecognizeTextRequest(completionHandler: recognizeTextHandler)
    request.recognitionLevel = .accurate
    request.recognitionLanguages = ["en_GB"]

    do {
      // Perform the text-recognition request.
      try requestHandler.perform([request])
      resolve("")
    } catch {
      reject("ocr_error", "Unable to perform the requests: \(error).", nil)
    }
    // self.sendEvent(withName: "progress", body: ["percent": 10])
    // resolve("works")
  }

  func convertBase64StringToImage (imageBase64String:String) -> UIImage {
    let imageData = Data(base64Encoded: imageBase64String)
    let image = UIImage(data: imageData!)
    return image!
  }

  func recognizeTextHandler(request: VNRequest, error: Error?) {
    guard let observations =
            request.results as? [VNRecognizedTextObservation] else {
        return
    }
    let recognizedStrings = observations.compactMap { observation in
        // Return the string of the top VNRecognizedText instance.
        return observation.topCandidates(1).first?.string
    }
    
    self.sendEvent(withName: "progress", body: [C_FINISHED_EVENT: ["text": recognizedStrings]])
  }
}
