import { NativeModules } from 'react-native';

NativeModules.RTMPPublisher = {
  startStream: jest.fn(),
  stopStream: jest.fn(),
  isStreaming: jest.fn(),
  isCameraOnPreview: jest.fn(),
  getPublishURL: jest.fn(),
  hasCongestion: jest.fn(),
  isAudioPrepared: jest.fn(),
  isVideoPrepared: jest.fn(),
  isMuted: jest.fn(),
  mute: jest.fn(),
  unmute: jest.fn(),
  switchCamera: jest.fn(),
  toggleFlash: jest.fn(),
};
