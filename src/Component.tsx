import { requireNativeComponent, ViewStyle } from 'react-native';

export interface RTMPPublisherProps {
  style?: ViewStyle;
  ref: any;
  publishURL: string;
  onLayoutChange?: () => void;
  onConnectionFailed?: () => void;
  onConnectionStarted?: () => void;
  onConnectionSuccess?: () => void;
  onDisconnect?: () => void;
  onNewBitrateReceived?: () => void;
}

export default requireNativeComponent<RTMPPublisherProps>('RTMPPublisher');
