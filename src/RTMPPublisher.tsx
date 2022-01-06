import React, { forwardRef, useImperativeHandle } from 'react';
import { NativeModules, ViewStyle } from 'react-native';
import PublisherComponent, {
  DisconnectType,
  LayoutChangeType,
  ConnectionFailedType,
  ConnectionStartedType,
  ConnectionSuccessType,
  NewBitrateReceivedType,
  StreamStateChangedType,
} from './Component';
import type { RTMPPublisherRefProps, StreamState } from './types';

const RTMPModule = NativeModules.RTMPPublisher;
export interface RTMPPublisherProps {
  style?: ViewStyle;
  publishUrl: string;
  /**
   * Callback for layout changes
   */
  onLayoutChange?: (data: null) => void;
  /**
   * Callback for connection fails on RTMP server
   */
  onConnectionFailed?: (data: null) => void;
  /**
   * Callback for starting connection to RTMP server
   */
  onConnectionStarted?: (data: null) => void;
  /**
   * Callback for connection successfully to RTMP server
   */
  onConnectionSuccess?: (data: null) => void;
  /**
   * Callback for disconnect successfully to RTMP server
   */
  onDisconnect?: (data: null) => void;
  /**
   * Callback for receiving new bitrate value about stream
   */
  onNewBitrateReceived?: (data: number) => void;
  /**
   * Alternatively callback for changing stream state
   * Returns parameter StreamState type
   */
  onStreamStateChanged?: (data: StreamState) => void;
}

const RTMPPublisher = forwardRef<RTMPPublisherRefProps, RTMPPublisherProps>(
  (
    {
      onConnectionFailed,
      onConnectionStarted,
      onConnectionSuccess,
      onDisconnect,
      onLayoutChange,
      onNewBitrateReceived,
      onStreamStateChanged,
      ...props
    },
    ref
  ) => {
    const startStream = async () => await RTMPModule.startStream();

    const stopStream = async () => await RTMPModule.stopStream();

    const isStreaming = async () => RTMPModule.isStreaming();

    const isCameraOnPreview = async () => RTMPModule.isCameraOnPreview();

    const getPublishURL = async () => RTMPModule.getPublishURL();

    const hasCongestion = async () => RTMPModule.hasCongestion();

    const isAudioPrepared = async () => RTMPModule.isAudioPrepared();

    const isVideoPrepared = async () => RTMPModule.isVideoPrepared();

    const isMuted = async () => RTMPModule.isMuted();

    const mute = () => RTMPModule.mute();

    const unmute = () => RTMPModule.unmute();

    const switchCamera = () => RTMPModule.switchCamera();

    const handleOnConnectionFailed = (e: ConnectionFailedType) => {
      onConnectionFailed && onConnectionFailed(e.nativeEvent.data);
    };

    const handleOnConnectionStarted = (e: ConnectionStartedType) => {
      onConnectionStarted && onConnectionStarted(e.nativeEvent.data);
    };

    const handleOnConnectionSuccess = (e: ConnectionSuccessType) => {
      onConnectionSuccess && onConnectionSuccess(e.nativeEvent.data);
    };

    const handleOnDisconnect = (e: DisconnectType) => {
      onDisconnect && onDisconnect(e.nativeEvent.data);
    };

    const handleOnLayoutChange = (e: LayoutChangeType) => {
      onLayoutChange && onLayoutChange(e.nativeEvent.data);
    };

    const handleOnNewBitrateReceived = (e: NewBitrateReceivedType) => {
      onNewBitrateReceived && onNewBitrateReceived(e.nativeEvent.data);
    };

    const handleOnStreamStateChanged = (e: StreamStateChangedType) => {
      onStreamStateChanged && onStreamStateChanged(e.nativeEvent.data);
    };

    useImperativeHandle(ref, () => ({
      startStream,
      stopStream,
      isStreaming,
      isCameraOnPreview,
      getPublishURL,
      hasCongestion,
      isAudioPrepared,
      isVideoPrepared,
      isMuted,
      mute,
      unmute,
      switchCamera,
    }));

    return (
      <PublisherComponent
        {...props}
        onConnectionFailed={handleOnConnectionFailed}
        onConnectionStarted={handleOnConnectionStarted}
        onConnectionSuccess={handleOnConnectionSuccess}
        onDisconnect={handleOnDisconnect}
        onLayoutChange={handleOnLayoutChange}
        onNewBitrateReceived={handleOnNewBitrateReceived}
        onStreamStateChanged={handleOnStreamStateChanged}
      />
    );
  }
);

export default RTMPPublisher;
