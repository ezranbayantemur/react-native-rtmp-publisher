<p align="center">
<img src="https://user-images.githubusercontent.com/42299721/150039268-bba167fe-c7de-471a-9587-565308d71f20.gif" alt="logo" width="60%" />
</p>

<p align="center">
<img src="https://img.shields.io/github/license/ezranbayantemur/react-native-rtmp-publisher" alt="github/license" />
<img src="https://img.shields.io/github/issues/ezranbayantemur/react-native-rtmp-publisher" alt="github/issues" />
<img src="https://img.shields.io/github/issues-pr/ezranbayantemur/react-native-rtmp-publisher" alt="github/issues-pr" />
<img src="https://img.shields.io/npm/dw/react-native-rtmp-publisher" alt="npm/dw" />
<img src="https://img.shields.io/github/followers/ezranbayantemur?style=social" alt="github/followers" />
<img src="https://img.shields.io/github/stars/ezranbayantemur/react-native-rtmp-publisher?style=social" alt="github/stars" />
<img src="https://img.shields.io/github/forks/ezranbayantemur/react-native-rtmp-publisher?style=social" alt="github/forks" />
</p>

📹 Live stream RTMP publisher for React Native with built in camera support!

## Installation

```sh
npm install react-native-rtmp-publisher
```

or

```sh
yarn add react-native-rtmp-publisher
```

for iOS, on `/ios` directory

```sh
pod install
```
### If you wanna enable bluetooth microphone connection (like AirPod) you should add this snippet to `AppDelegate.m` 
```objc
#import <AVFoundation/AVFoundation.h> // <-- Add this import
.. 
.. 

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  ..
  .. 
  ..
  ..

  if (@available(iOS 10.0, *)) {
      [session
        setCategory:AVAudioSessionCategoryPlayAndRecord
        mode:AVAudioSessionModeVoiceChat
        options:AVAudioSessionCategoryOptionDefaultToSpeaker|AVAudioSessionCategoryOptionAllowBluetooth
        error:&error];
    } else {
      SEL selector = NSSelectorFromString(@"setCategory:withOptions:error:");
      
      NSArray * optionsArray =
          [NSArray arrayWithObjects:
            [NSNumber numberWithInteger:AVAudioSessionCategoryOptionAllowBluetooth],
            [NSNumber numberWithInteger:AVAudioSessionCategoryOptionDefaultToSpeaker], nil];
      
      [session
        performSelector:selector
        withObject: AVAudioSessionCategoryPlayAndRecord
        withObject: optionsArray
      ];
      
      [session 
        setMode:AVAudioSessionModeVoiceChat 
        error:&error
      ];
    }
    
    [session 
      setActive:YES 
      error:&error
    ];

    return YES;
  }
```
## Example Project

Clone the repo and on `/example` directory

```sh
yarn
```

and

```sh
yarn ios (or yarn android)
```

You can use Youtube for live stream server. You can check [Live on Youtube](https://support.google.com/youtube/answer/2474026?hl=tr&ref_topic=9257984)

## Usage

### Android

Add Android Permission for camera and audio to `AndroidManifest.xml`

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

### iOS

Add iOS Permission for camera and audio to `Info.plist`

```xml
<key>NSCameraUsageDescription</key>
 <string>CAMERA PERMISSION DESCRIPTION</string>
<key>NSMicrophoneUsageDescription</key>
 <string>AUDIO PERMISSION DESCRIPTION</string>
```

### React Native

```js
import { RTMPPublisher } from 'react-native-rtmp-publisher';

// ...

async function publisherActions() {
  await publisherRef.current.startStream();
  await publisherRef.current.stopStream();
  await publisherRef.current.mute();
  await publisherRef.current.unmute();
  await publisherRef.current.switchCamera();
  await publisherRef.current.getPublishURL();
  await publisherRef.current.isMuted();
  await publisherRef.current.isStreaming();
  await publisherRef.current.toggleFlash();
  await publisherRef.current.hasCongestion();
  await publisherRef.current.isAudioPrepared();
  await publisherRef.current.isVideoPrepared();
  await publisherRef.current.isCameraOnPreview();
  await publisherRef.current.setAudioInput();
}

<RTMPPublisher
  ref={publisherRef}
  streamURL="rtmp://your-publish-url"
  streamName="stream-name"
  onConnectionFailedRtmp={() => null}
  onConnectionStartedRtmp={() => null}
  onConnectionSuccessRtmp={() => null}
  onDisconnectRtmp={() => null}
  onNewBitrateRtmp={() => null}
  onStreamStateChanged={(s: streamState) => null}
/>;
```

## Props

|     Name     |   Type   | Required |              Description              |
| :----------: | :------: | :------: | :-----------------------------------: |
| `streamURL`  | `string` |  `true`  | Publish URL address with RTM Protocol |
| `streamName` | `string` |  `true`  |          Stream name or key           |

### Youtube Example

For live stream, Youtube gives you stream url and stream key, you can place the key on `streamName` parameter

**Youtube Stream URL:** `rtmp://a.rtmp.youtube.com/live2`

**Youtube Stream Key:** `****-****-****-****-****`

```js
<RTMPPublisher
  streamURL="rtmp://a.rtmp.youtube.com/live2"
  streamName="****-****-****-****-****"
  ...
  ...
```

## Events

|          Name                    |        Returns            |                                        Description                                        |  Android | iOS |
| :------------------------------: | :-----------------------: | :---------------------------------------------------------------------------------------: | :------: |:---:|
|      `onConnectionFailed`        |         `null`            |                        Invokes on connection fails to publish URL                         |     ✅    |  ✅ |
|     `onConnectionStarted`        |         `null`            |                        Invokes on connection start to publish URL                         |     ✅    |  ✅ |
|     `onConnectionSuccess`        |         `null`            |                       Invokes on connection success to publish URL                        |     ✅    |  ✅ |
|         `onDisconnect`           |         `null`            |                          Invokes on disconnect from publish URL                           |     ✅    |  ✅ |
|     `onNewBitrateReceived`       |         `null`            |                         Invokes on new bitrate received from URL                          |     ✅    |  ❌ |
|     `onStreamStateChanged`       |      `StreamState`        | Invokes on stream state changes. It can be use alternatively for above connection events. |     ✅    |  ✅ |
| `onBluetoothDeviceStatusChanged` | `BluetoothDeviceStatuses` |                        Invokes on bluetooth headset state changes.                        |     ✅    |  ❌ |

## Methods

|        Name         |          Returns          |         Description         |   Android | iOS |
| :-----------------: | :------------------------:| :-------------------------: |  :------: |:---:|
|    `startStream`    |       `Promise<void>`     |      Starts the stream      |     ✅    |  ✅ |
|    `stopStream`     |       `Promise<void>`     |      Stops the stream       |     ✅    |  ✅ |
|       `mute`        |       `Promise<void>`     |    Mutes the microphone     |     ✅    |  ✅ |
|      `unmute`       |       `Promise<void>`     |   Unmutes the microphone    |     ✅    |  ✅ |
|   `switchCamera`    |       `Promise<void>`     |     Switches the camera     |     ✅    |  ✅ |
|   `toggleFlash`     |       `Promise<void>`     |    Toggles the flash        |     ✅    |  ✅ |
|   `getPublishURL`   |      `Promise<string>`    |    Gets the publish URL     |     ✅    |  ✅ |
|      `isMuted`      |      `Promise<boolean>`   |  Returns microphone state   |     ✅    |  ✅ |
|    `isStreaming`    |      `Promise<boolean>`   |   Returns streaming state   |     ✅    |  ✅ |
|   `hasCongestion`   |      `Promise<boolean>`   |    Returns if congestion    |     ✅    |  ❌ |
|  `isAudioPrepared`  |      `Promise<boolean>`   | Returns audio prepare state |     ✅    |  ✅ |
|  `isVideoPrepared`  |      `Promise<boolean>`   | Returns video prepare state |     ✅    |  ✅ |
| `isCameraOnPreview` |      `Promise<boolean>`   |    Returns camera is on     |     ✅    |  ❌ |
|   `setAudioInput`   |  `Promise<AudioInputType>`|    Sets microphone input    |     ✅    |  ✅ |

## Types

| Name                      |                      Value                          |
| ------------------------- | :--------------------------------------------------:|
| `streamState`             | `CONNECTING`, `CONNECTED`, `DISCONNECTED`, `FAILED` |
| `BluetoothDeviceStatuses` | `CONNECTING`, `CONNECTED`, `DISCONNECTED`           |
| `AudioInputType`          | `BLUETOOTH_HEADSET`, `SPEAKER`, `WIRED_HEADSET`     |

* AudioInputType: WIRED_HEADSET type supporting in only iOS. On Android it affects nothing. If a wired headset connected to Android device, device uses it as default.
## Used Native Packages

- Android: [rtmp-rtsp-stream-client-java](https://github.com/pedroSG94/rtmp-rtsp-stream-client-java)
- iOS: [HaishinKit.swift](https://github.com/shogo4405/HaishinKit.swift)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
