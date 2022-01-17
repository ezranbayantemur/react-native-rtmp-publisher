//
//  RTMPCreator.swift
//  rtmpPackageExample
//
//  Created by Ezran Bayantemur on 15.01.2022.
//
import HaishinKit

class RTMPCreator {
  public static let connection: RTMPConnection = RTMPConnection()
  public static let stream: RTMPStream = RTMPStream(connection: connection)
  private static var _streamUrl: String = ""
  private static var _streamName: String = ""
  public static var isStreaming: Bool = false
  
  public static func setStreamUrl(url: String){
    _streamUrl = url
  }
  
  public static func setStreamName(name: String){
    _streamName = name
  }

  
  public static func getPublishURL() -> String {
    // TODO: Object formatına dönüştürülebilir
    /**
      {
        streamName: _streamName
        streamUrl: _streamUrl
      }
     */
    return "\(_streamUrl)/\(_streamName)"
  }
  
  public static func startPublish(){
    connection.requireNetworkFramework = true
    connection.connect(_streamUrl)
    stream.publish(_streamName)
    isStreaming = true
    
  }
  
  public static func stopPublish(){
    stream.close()
    connection.close()
    isStreaming = false
  }

}
