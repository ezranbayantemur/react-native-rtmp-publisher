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
    
  @objc var videoSettings: NSDictionary = NSDictionary(
    dictionary: [
      "width": 720,
      "height": 1280,
      "bitrate": 3000
    ]
  )
    
  override init(frame: CGRect) {
    super.init(frame: frame)
    UIApplication.shared.isIdleTimerDisabled = true
    
    hkView = MTHKView(frame: UIScreen.main.bounds)
    hkView.videoGravity = .resizeAspectFill
    
    RTMPCreator.stream.frameRate = 30
    RTMPCreator.stream.sessionPreset = AVCaptureSession.Preset.hd1920x1080
      
      print("initialize videoSettings",videoSettings)
      
      let width = videoSettings["width"] as? Int ?? 720
      let height = videoSettings["height"] as? Int ?? 1280
      let bitrate = videoSettings["bitrate"] as? Int ?? 3000
      
    RTMPCreator.stream.videoSettings = [
      .width: width,
      .height: height,
      .bitrate: bitrate * 1024,
      .scalingMode: ScalingMode.cropSourceToCleanAperture
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
        if #available(iOS 13.0, *) {
            RTMPCreator.stream.attachMultiCamera(nil)
        }
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
