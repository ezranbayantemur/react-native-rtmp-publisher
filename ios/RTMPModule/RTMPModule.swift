//
//  RTMPManager.swift
//  rtmpPackageExample
//
//  Created by Ezran Bayantemur on 15.01.2022.
//

import AudioToolbox
import AVFoundation
import HaishinKit

// TODO: Try catch blokları eklenecek

@objc(RTMPPublisher)
class RTMPModule: NSObject {
  private var cameraPosition: AVCaptureDevice.Position = .back

  @objc
  func startStream(_ resolve: (RCTPromiseResolveBlock), reject: (RCTPromiseRejectBlock)){
    RTMPCreator.startPublish()
  }
  
  @objc
  func stopStream(_ resolve: (RCTPromiseResolveBlock), reject: (RCTPromiseRejectBlock)){
    RTMPCreator.stopPublish()
  }
  
  @objc
  func mute(_ resolve: (RCTPromiseResolveBlock), reject: (RCTPromiseRejectBlock)){
    RTMPCreator.stream.audioSettings[.muted] = true
  }
  
  @objc
  func unmute(_ resolve: (RCTPromiseResolveBlock), reject: (RCTPromiseRejectBlock)){
    RTMPCreator.stream.audioSettings[.muted] = false
  }
  
  @objc
  func switchCamera(_ resolve: (RCTPromiseResolveBlock), reject: (RCTPromiseRejectBlock)){
    cameraPosition = cameraPosition == .back ? .front : .back
    RTMPCreator.stream.attachCamera(DeviceUtil.device(withPosition: cameraPosition))
  }

  @objc
  func getPublishURL(_ resolve: (RCTPromiseResolveBlock), reject: (RCTPromiseRejectBlock)){
    resolve(RTMPCreator.getPublishURL())
  }
  
  @objc
  func isMuted(_ resolve: (RCTPromiseResolveBlock), reject: (RCTPromiseRejectBlock)){
    resolve(RTMPCreator.stream.audioSettings[.muted])
  }

  @objc
  func isStreaming(_ resolve: (RCTPromiseResolveBlock), reject: (RCTPromiseRejectBlock)){
    resolve(RTMPCreator.isStreaming)
  }
  
  @objc
  func isAudioPrepared(_ resolve: (RCTPromiseResolveBlock), reject: (RCTPromiseRejectBlock)){
    resolve(RTMPCreator.stream.receiveAudio)
  }
  
  @objc
  func isVideoPrepared(_ resolve: (RCTPromiseResolveBlock), reject: (RCTPromiseRejectBlock)){
    resolve(RTMPCreator.stream.receiveVideo)
  }
    
  @objc
  func toggleFlash(_ resolve: (RCTPromiseResolveBlock), reject: (RCTPromiseRejectBlock)){
      resolve(RTMPCreator.stream.torch.toggle())
  }
}
