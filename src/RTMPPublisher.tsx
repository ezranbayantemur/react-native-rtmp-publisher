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
import type { StreamState } from './types';

const RTMPModule = NativeModules.RTMPPublisher;

interface RTMPPublisherRefProps {
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
  publishUrl: string;
  onLayoutChange?: (data: null) => void;
  onConnectionFailed?: (data: null) => void;
  onConnectionStarted?: (data: null) => void;
  onConnectionSuccess?: (data: null) => void;
  onDisconnect?: (data: null) => void;
  onNewBitrateReceived?: (data: number) => void;
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
    /**
     * Starts stream operation
     */
    const startStream = async () => await RTMPModule.startStream();

    /**
     * Stops stream operation
     */
    const stopStream = async () => await RTMPModule.stopStream();

    /**
     * Checks stream status
     */
    const isStreaming = async () => RTMPModule.isStreaming();

    /**
     * Checks if camera on mount
     */
    const isCameraOnPreview = async () => RTMPModule.isCameraOnPreview();

    /**
     * Gets settled publish url
     */
    const getPublishURL = async () => RTMPModule.getPublishURL();

    /**
     * Checks congestion status
     */
    const hasCongestion = async () => RTMPModule.hasCongestion();

    /**
     * Checks audio status
     */
    const isAudioPrepared = async () => RTMPModule.isAudioPrepared();

    /**
     * Checks video status
     */
    const isVideoPrepared = async () => RTMPModule.isVideoPrepared();

    /**
     * Checks if mic closed
     */
    const isMuted = async () => RTMPModule.isMuted();

    /**
     * Mute the mic
     */
    const mute = () => RTMPModule.mute();

    /**
     * Unmute the mic
     */
    const unmute = () => RTMPModule.unmute();

    /**
     * Switches the camera
     */
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
