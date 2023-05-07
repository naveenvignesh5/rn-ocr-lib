@objc(RnOcrLib)
class RnOcrLib: NSObject {
  @objc(multiply:withB:withResolver:withRejecter:)
  func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    resolve(a*b)
  }

  @objc(ocr:withResolver:withRejecter:)
  func ocr(base64Data: String, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
    if base64Data.trimmingCharacters(in: .whitespaces).isEmpty {
      reject("Empty Error", "Image data cannot be empty", nil)
      return
    }

    resolve("ocr result")
  }
}
