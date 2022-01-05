# react-native-rtmp

RTMP publisher for React Native

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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
