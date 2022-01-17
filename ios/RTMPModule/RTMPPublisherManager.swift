//
//  RTMPViewManager.swift
//  rtmpPackageExample
//
//  Created by Ezran Bayantemur on 15.01.2022.
//

import UIKit

@objc(RTMPPublisherManager)
class RTMPPublisherManager: RCTViewManager {
  override func view() -> UIView! {
    return RTMPView()
  }
}
