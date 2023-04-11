//
//  RTMPManager.m
//  rtmpPackageExample
//
//  Created by Ezran Bayantemur on 15.01.2022.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RTMPPublisher, NSObject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

RCT_EXTERN_METHOD(
                    startStream: (RCTPromiseResolveBlock)resolve
                    reject: (RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(
                    stopStream: (RCTPromiseResolveBlock)resolve
                    reject: (RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(
                    mute: (RCTPromiseResolveBlock)resolve
                    reject: (RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(
                    unmute: (RCTPromiseResolveBlock)resolve
                    reject: (RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(
                    switchCamera: (RCTPromiseResolveBlock)resolve
                    reject: (RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(
                    getPublishURL: (RCTPromiseResolveBlock)resolve
                    reject: (RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(
                    isMuted: (RCTPromiseResolveBlock)resolve
                    reject: (RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(
                    isStreaming: (RCTPromiseResolveBlock)resolve
                    reject: (RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(
                    isAudioPrepared: (RCTPromiseResolveBlock)resolve
                    reject: (RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(
                    isVideoPrepared: (RCTPromiseResolveBlock)resolve
                    reject: (RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(
                    isCameraOnPreview: (RCTPromiseResolveBlock)resolve
                    reject: (RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(
                    toggleFlash: (RCTPromiseResolveBlock)resolve
                    reject: (RCTPromiseRejectBlock)reject
                  )


RCT_EXTERN_METHOD(
                    setAudioInput: (NSInteger)audioInput
                    resolve: (RCTPromiseResolveBlock)resolve
                    reject: (RCTPromiseRejectBlock)reject
                  )

RCT_EXTERN_METHOD(
                    setVideoSettings: (NSDictionary *)videoSettings
                    resolve: (RCTPromiseResolveBlock)resolve
                    reject: (RCTPromiseRejectBlock)reject
                  )

@end
