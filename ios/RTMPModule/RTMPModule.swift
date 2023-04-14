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
    func setVideoSettings(_ videoSettingsDict: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let width = videoSettingsDict["width"] as? Int,
              let height = videoSettingsDict["height"] as? Int,
              let bitrate = videoSettingsDict["bitrate"] as? Int else {
            reject("INVALID_ARGUMENTS", "Invalid video settings", nil)
            return
        }
        let audioBitrate = videoSettingsDict["audioBitrate"] as? Int ?? 128000
        let videoSettings = VideoSettingsType(width: width, height: height, bitrate: bitrate, audioBitrate: audioBitrate)
        
        resolve(RTMPCreator.setVideoSettings(videoSettings))
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
        
        RTMPCreator.stream.captureSettings = [
            .isVideoMirrored: cameraPosition == .back ? false : true
        ]
        RTMPCreator.stream.attachCamera(
            AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: cameraPosition)
        )
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
    
    @objc
    func setAudioInput(_ audioInput: (NSInteger), resolve: (RCTPromiseResolveBlock), reject: (RCTPromiseRejectBlock)){
        resolve(RTMPCreator.setAudioInput(audioInput: audioInput))
    }
}
