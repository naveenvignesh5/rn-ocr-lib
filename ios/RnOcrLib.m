#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(RnOcrLib, RCTEventEmitter)

// RCT_EXTERN_METHOD(multiply:(float)a withB:(float)b
//                  withResolver:(RCTPromiseResolveBlock)resolve
//                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getText:(NSString *) data
                 withOcrInputType:(NSString *) ocrInputType
                 withOcrOptions:(NSDictionary *) ocrOptions
                 withResolver:(RCTPromiseResolveBlock) resolve
                 withRejecter:(RCTPromiseRejectBlock) reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
