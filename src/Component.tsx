import { requireNativeComponent, ViewStyle } from 'react-native';

export interface RTMPPublisherProps {
  style?: ViewStyle;
  ref: any;
  publishURL: string;
  onLayoutChange?: () => void;
  onConnectionFailedRtmp?: () => void;
  onConnectionStartedRtmp?: () => void;
  onConnectionSuccessRtmp?: () => void;
  onDisconnectRtmp?: () => void;
  onNewBitrateRtmp?: () => void;
}

export default requireNativeComponent<RTMPPublisherProps>('RTMPPublisher');
