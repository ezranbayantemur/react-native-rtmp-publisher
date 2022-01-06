import type { ViewStyle } from 'react-native';

export interface RTMPPublisherRefProps {
  startStream: () => Promise<void>;
  stopStream: () => Promise<void>;
  isStreaming: () => Promise<boolean>;
  isCameraOnPreview: () => Promise<boolean>;
  getPublishURL: () => Promise<string>;
  hasCongestion: () => Promise<boolean>;
  isAudioPrepared: () => Promise<boolean>;
  isVideoPrepared: () => Promise<boolean>;
  isMuted: () => Promise<boolean>;
  mute: () => Promise<void>;
  unmute: () => Promise<void>;
  switchCamera: () => Promise<void>;
}

export interface RTMPPublisherProps {
  style?: ViewStyle;
  publishURL: string;
  onLayoutChange?: (e: null) => void;
  onConnectionFailed?: (e: null) => void;
  onConnectionStarted?: (e: null) => void;
  onConnectionSuccess?: (e: null) => void;
  onDisconnect?: (e: null) => void;
  onNewBitrateReceived?: (e: number) => void;
  onStreamStateChanged?: (e: StreamState) => void;
}
export type StreamStatus =
  | 'CONNECTING'
  | 'CONNECTED'
  | 'DISCONNECTED'
  | 'FAILED';

export enum StreamState {
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  FAILED = 'FAILED',
}
