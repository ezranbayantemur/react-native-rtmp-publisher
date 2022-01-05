# react-native-rtmp

📹 Live stream RTMP publisher for React Native

## Installation

```sh
npm install react-native-rtmp
```

or

```sh
yarn add react-native-rtmp
```

## Usage

### Android

Add Android Permission for camera

```xml
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
```

### React Native

```js
import { RTMPPublisher } from 'react-native-rtmp';

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
/>;
```

## Props
| Name           |                                   Type                                           |                                   Description |
| -------------- | :------------------------------------------------------------------------------: | --------------------------------------------: |
| `publishURL`   |         `string`                                                                 |      Publish URL address with RTM Protocol    |

## Events
| Name                        |         Returns             |  Description                                 |
| --------------------------  | :-------------------------: | --------------------------------------------:|
| `onLayoutChange`            |         `null`              | Invokes on layout changes                    |
| `onConnectionFailedRtmp`    |         `null`              | Invokes on connection fails to publish URL   |
| `onConnectionStartedRtmp`   |         `null`              | Invokes on connection start to publish URL   |
| `onConnectionSuccessRtmp`   |         `null`              | Invokes on connection success to publish URL |
| `onDisconnectRtmp`          |         `null`              | Invokes on disconnect from publish URL       |
| `onNewBitrateRtmp`          |         `null`              | Invokes on new bitrate received from URL     |
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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
