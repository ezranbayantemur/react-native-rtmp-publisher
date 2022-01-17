//
//  RTMPViewManager.m
//  rtmpPackageExample
//
//  Created by Ezran Bayantemur on 15.01.2022.
//

#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(RTMPPublisherManager, RCTViewManager)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

RCT_EXPORT_VIEW_PROPERTY(streamURL, NSString)

RCT_EXPORT_VIEW_PROPERTY(streamName, NSString)

RCT_EXPORT_VIEW_PROPERTY(onDisconnect, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onConnectionFailed, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onConnectionStarted, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onConnectionSuccess, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onNewBitrateReceived, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onStreamStateChanged, RCTDirectEventBlock)

@end
