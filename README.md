# react-native-rtmp-publisher

📹 Live stream RTMP publisher for React Native

### ⚠️ iOS on development

## Installation

```sh
npm install react-native-rtmp-publisher
```

or

```sh
yarn add react-native-rtmp-publisher
```

## Usage

### Android

Add Android Permission for camera

```xml
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
```

### iOS
***Under development 🛠***

### React Native

```js
import { RTMPPublisher } from 'react-native-rtmp-publisher';

// ...

function publisherActions() {
  publisherRef.current.startStream();
  publisherRef.current.stopStream();
  publisherRef.current.mute();
  publisherRef.current.unmute();
  publisherRef.current.switchCamera();
  publisherRef.current.getPublishURL();
  publisherRef.current.isMuted();
  publisherRef.current.isStreaming();
  publisherRef.current.hasCongestion();
  publisherRef.current.isAudioPrepared();
  publisherRef.current.isVideoPrepared();
  publisherRef.current.isCameraOnPreview();
}

<RTMPPublisher
  ref={publisherRef}
  publishUrl="rtmp://your-publish-url"
  onLayoutChange={() => null}
  onConnectionFailedRtmp={() => null}
  onConnectionStartedRtmp={() => null}
  onConnectionSuccessRtmp={() => null}
  onDisconnectRtmp={() => null}
  onNewBitrateRtmp={() => null}
  onStreamStateChanged={(s: streamState) => null}
/>;
```

## Props
| Name           |    Type    |   Required   |   Description                         |
| -------------- | :--------: | :----------: |:-------------------------------------:|
| `publishUrl`   |  `string`  |   `true`     | Publish URL address with RTM Protocol |

## Events
| Name                        |   Returns     |  Description                                                                              |
| --------------------------  | :------------:| -----------------------------------------------------------------------------------------:|
| `onLayoutChange`            |  `null`       | Invokes on layout changes                                                                 |
| `onConnectionFailed`        |  `null`       | Invokes on connection fails to publish URL                                                |
| `onConnectionStarted`       |  `null`       | Invokes on connection start to publish URL                                                |
| `onConnectionSuccess`       |  `null`       | Invokes on connection success to publish URL                                              |
| `onDisconnect`              |  `null`       | Invokes on disconnect from publish URL                                                    |
| `onNewBitrateReceived`      |  `null`       | Invokes on new bitrate received from URL                                                  |
| `onStreamStateChanged`      | `streamState` | Invokes on stream state changes. It can be use alternatively for above connection events. | 

## Methods
| Name                |         Returns             |  Description                |
| ------------------  | :-------------------------: | ---------------------------:|
| `startStream`       |         `null`              | Starts the stream           |
| `stopStream`        |         `null`              | Stops the stream            |
| `mute`              |         `null`              | Mutes the microphone        |
| `unmute`            |         `null`              | Unmutes the microphone      |
| `switchCamera`      |         `null`              | Switches the camera         |
| `getPublishURL`     |         `string`            | Gets the publish URL        |
| `isMuted`           |         `boolean`           | Returns microphone state    |
| `isStreaming`       |         `boolean`           | Returns streaming state     |
| `hasCongestion`     |         `boolean`           | Returns if congestion       |
| `isAudioPrepared`   |         `boolean`           | Returns audio prepare state |
| `isVideoPrepared`   |         `boolean`           | Returns video prepare state |
| `isCameraOnPreview` |         `boolean`           | Returns camera is on        |


## Types
| Name                |         Value                                    |
| ------------------  | :----------------------------------------------: |
| `streamState`       | `CONNECTING` `CONNECTED` `DISCONNECTED` `FAILED` |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
