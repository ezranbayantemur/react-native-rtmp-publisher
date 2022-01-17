import type { ViewStyle } from 'react-native';

export interface RTMPPublisherRefProps {
  /**
   * Starts stream operation
   */
  startStream: () => Promise<void>;
  /**
   * Stops stream operation
   */
  stopStream: () => Promise<void>;
  /**
   * Checks stream status
   */
  isStreaming: () => Promise<boolean>;
  /**
   * Checks if camera on mount
   */
  isCameraOnPreview: () => Promise<boolean>;
  /**
   * Gets settled publish url
   */
  getPublishURL: () => Promise<string>;
  /**
   * Checks congestion status
   */
  hasCongestion: () => Promise<boolean>;
  /**
   * Checks audio status
   */
  isAudioPrepared: () => Promise<boolean>;
  /**
   * Checks video status
   */
  isVideoPrepared: () => Promise<boolean>;
  /**
   * Checks if mic closed
   */
  isMuted: () => Promise<boolean>;
  /**
   * Mutes the mic
   */
  mute: () => Promise<void>;
  /**
   * Unmutes the mic
   */
  unmute: () => Promise<void>;
  /**
   * Switches the camera
   */
  switchCamera: () => Promise<void>;
}

export interface RTMPPublisherProps {
  style?: ViewStyle;
  streamURL: string;
  streamName: string;
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
