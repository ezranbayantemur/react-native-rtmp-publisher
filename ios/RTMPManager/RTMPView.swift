//
//  RTMPView.swift
//  rtmpPackageExample
//
//  Created by Ezran Bayantemur on 15.01.2022.
//

import UIKit
import HaishinKit
import AVFoundation

class RTMPView: UIView {
  private var hkView: MTHKView!
  @objc var onDisconnect: RCTDirectEventBlock?
  @objc var onConnectionFailed: RCTDirectEventBlock?
  @objc var onConnectionStarted: RCTDirectEventBlock?
  @objc var onConnectionSuccess: RCTDirectEventBlock?
  @objc var onNewBitrateReceived: RCTDirectEventBlock?
  @objc var onStreamStateChanged: RCTDirectEventBlock?
  
  @objc var streamURL: NSString = "" {
    didSet {
      RTMPCreator.setStreamUrl(url: streamURL as String)
    }
  }
  
  @objc var streamName: NSString = "" {
    didSet {
      RTMPCreator.setStreamName(name: streamName as String)
    }
  }
    
  @objc var videoSettingsDictionary: NSDictionary = NSDictionary(
    dictionary: [
      "width": 720,
      "height": 1280,
        "bitrate": 3000 * 1000,
        "audioBitrate": 192 * 1000
    ]
  ){
    didSet {
        let width = videoSettingsDictionary["width"] as? Int ?? 720
        let height = videoSettingsDictionary["height"] as? Int ?? 1280
        let bitrate = videoSettingsDictionary["bitrate"] as? Int ?? (3000 * 1000)
        let audioBitrate = videoSettingsDictionary["audioBitrate"] as? Int ?? (192 * 1000)
        
        RTMPCreator.setVideoSettings(VideoSettingsType(width: width, height: height, bitrate: bitrate, audioBitrate: audioBitrate)
  )
    }
  }
    
  override init(frame: CGRect) {
    super.init(frame: frame)
    UIApplication.shared.isIdleTimerDisabled = true
    
    hkView = MTHKView(frame: UIScreen.main.bounds)
    hkView.videoGravity = .resizeAspectFill
    
    RTMPCreator.stream.audioSettings = [
        .bitrate: RTMPCreator.videoSettings.audioBitrate
    ]
      
    RTMPCreator.stream.captureSettings = [
      .fps: 30,
      .sessionPreset: AVCaptureSession.Preset.hd1920x1080,
      .continuousAutofocus: true,
      .continuousExposure: true,
    ]
      
    RTMPCreator.stream.videoSettings = [
      .width: RTMPCreator.videoSettings.width,
      .height: RTMPCreator.videoSettings.height,
      .bitrate: RTMPCreator.videoSettings.bitrate,
      .scalingMode: ScalingMode.cropSourceToCleanAperture,
      .profileLevel: kVTProfileLevel_H264_High_AutoLevel
    ]

    RTMPCreator.stream.attachAudio(AVCaptureDevice.default(for: .audio))
    RTMPCreator.stream.attachCamera(AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .back))

    RTMPCreator.connection.addEventListener(.rtmpStatus, selector: #selector(statusHandler), observer: self)

    hkView.attachStream(RTMPCreator.stream)

    self.addSubview(hkView)
      
}
    
    required init?(coder aDecoder: NSCoder) {
       fatalError("init(coder:) has not been implemented")
     }
    
    override func removeFromSuperview() {
        RTMPCreator.stream.attachAudio(nil)
        RTMPCreator.stream.attachCamera(nil)
     }
  
    @objc
    private func statusHandler(_ notification: Notification){
      let e = Event.from(notification)
       guard let data: ASObject = e.data as? ASObject, let code: String = data["code"] as? String else {
           return
       }
    
       switch code {
       case RTMPConnection.Code.connectSuccess.rawValue:
         if onConnectionSuccess != nil {
              onConnectionSuccess!(nil)
            }
           changeStreamState(status: "CONNECTING")
           RTMPCreator.stream.publish(streamName as String)
           break
       
       case RTMPConnection.Code.connectFailed.rawValue:
         if onConnectionFailed != nil {
              onConnectionFailed!(nil)
            }
           changeStreamState(status: "FAILED")
           break
         
       case RTMPConnection.Code.connectClosed.rawValue:
         if onDisconnect != nil {
              onDisconnect!(nil)
            }
           break
         
       case RTMPStream.Code.publishStart.rawValue:
         if onConnectionStarted != nil {
              onConnectionStarted!(nil)
            }
           changeStreamState(status: "CONNECTED")
           break
         
       default:
           break
       }
    }

    public func changeStreamState(status: String){
      if onStreamStateChanged != nil {
        onStreamStateChanged!(["data": status])
       }
    }
}
