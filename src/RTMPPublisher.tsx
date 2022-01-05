import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { NativeModules } from 'react-native';
import PublisherComponent from './Component';

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

const RTMPPublisher = forwardRef<RTMPPublisherRefProps>((props, ref) => {
  const publisherRef = useRef(null);

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

  return <PublisherComponent ref={publisherRef} publishURL="" {...props} />;
});

export default RTMPPublisher;
