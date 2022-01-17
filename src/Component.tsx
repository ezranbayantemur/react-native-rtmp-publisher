import {
  NativeSyntheticEvent,
  requireNativeComponent,
  ViewStyle,
} from 'react-native';
import type { StreamState } from './types';

type RTMPData<T> = { data: T };

export type ConnectionFailedType = NativeSyntheticEvent<RTMPData<string>>;
export type ConnectionStartedType = NativeSyntheticEvent<RTMPData<string>>;
export type ConnectionSuccessType = NativeSyntheticEvent<RTMPData<null>>;
export type DisconnectType = NativeSyntheticEvent<RTMPData<null>>;
export type NewBitrateReceivedType = NativeSyntheticEvent<RTMPData<number>>;
export type StreamStateChangedType = NativeSyntheticEvent<
  RTMPData<StreamState>
>;
export interface NativeRTMPPublisherProps {
  style?: ViewStyle;
  streamURL: string;
  streamName: string;
  onConnectionFailed?: (e: ConnectionFailedType) => void;
  onConnectionStarted?: (e: ConnectionStartedType) => void;
  onConnectionSuccess?: (e: ConnectionSuccessType) => void;
  onDisconnect?: (e: DisconnectType) => void;
  onNewBitrateReceived?: (e: NewBitrateReceivedType) => void;
  onStreamStateChanged?: (e: StreamStateChangedType) => void;
}
export default requireNativeComponent<NativeRTMPPublisherProps>(
  'RTMPPublisher'
);
