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

async function publisherActions() {
  await publisherRef.current.startStream();
  await publisherRef.current.stopStream();
  await publisherRef.current.mute();
  await publisherRef.current.unmute();
  await publisherRef.current.switchCamera();
  await publisherRef.current.getPublishURL();
  await publisherRef.current.isMuted();
  await publisherRef.current.isStreaming();
  await publisherRef.current.hasCongestion();
  await publisherRef.current.isAudioPrepared();
  await publisherRef.current.isVideoPrepared();
  await publisherRef.current.isCameraOnPreview();
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
| `startStream`       |         `Promise<null>`              | Starts the stream           |
| `stopStream`        |         `Promise<null>`              | Stops the stream            |
| `mute`              |         `Promise<null>`              | Mutes the microphone        |
| `unmute`            |         `Promise<null>`              | Unmutes the microphone      |
| `switchCamera`      |         `Promise<null>`              | Switches the camera         |
| `getPublishURL`     |         `Promise<string>`            | Gets the publish URL        |
| `isMuted`           |         `Promise<boolean>`           | Returns microphone state    |
| `isStreaming`       |         `Promise<boolean>`           | Returns streaming state     |
| `hasCongestion`     |         `Promise<boolean>`           | Returns if congestion       |
| `isAudioPrepared`   |         `Promise<boolean>`           | Returns audio prepare state |
| `isVideoPrepared`   |         `Promise<boolean>`           | Returns video prepare state |
| `isCameraOnPreview` |         `Promise<boolean>`           | Returns camera is on        |


## Types
| Name                |         Value                                    |
| ------------------  | :----------------------------------------------: |
| `streamState`       | `CONNECTING` `CONNECTED` `DISCONNECTED` `FAILED` |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
