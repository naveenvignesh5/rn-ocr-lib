import Foundation

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
  func getText(data: String, ocrInputType: String, ocrOptions: NSDictionary, resolve: RCTPromiseResolveBlock,reject: RCTPromiseRejectBlock) -> Void {
    print("data", data)
    print("ocrInputType", ocrInputType)
    print("ocrInputType", ocrOptions)

    self.sendEvent(withName: "progress", body: ["percent": 10])
    resolve("works")
  }
}
