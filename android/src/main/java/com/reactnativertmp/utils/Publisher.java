package com.reactnativertmp.utils;

import android.view.SurfaceView;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.pedro.rtplibrary.rtmp.RtmpCamera1;
import com.reactnativertmp.interfaces.ConnectionListener;

public class Publisher {
  private final SurfaceView _surfaceView;
  private final RtmpCamera1 _rtmpCamera;
  private final ThemedReactContext _reactContext;
  ConnectionChecker connectionChecker = new ConnectionChecker();
  private String _publishURL;

  public Publisher(ThemedReactContext reactContext, SurfaceView surfaceView) {
    _reactContext = reactContext;
    _surfaceView = surfaceView;
    _rtmpCamera = new RtmpCamera1(surfaceView, connectionChecker);

    connectionChecker.addListener(createConnectionListener());
  }

  public ConnectionListener createConnectionListener() {
    return new ConnectionListener() {
      @Override
      public void onChange(String type) {
        _reactContext
          .getJSModule(RCTEventEmitter.class)
          .receiveEvent(_surfaceView.getId(), type, null);
      }
    };
  }

  public RtmpCamera1 getRtmpCamera() {
    return _rtmpCamera;
  }

  public String getPublishURL() {
    return _publishURL;
  }

  public void setPublishURL(String _publishURL) {
    this._publishURL = _publishURL;
  }

  public boolean isStreaming() {
    return _rtmpCamera.isStreaming();
  }

  public boolean isOnPreview() {
    return _rtmpCamera.isOnPreview();
  }

  public boolean isAudioPrepared() {
    return _rtmpCamera.prepareAudio();
  }

  public boolean isVideoPrepared() {
    return _rtmpCamera.prepareVideo();
  }

  public boolean hasCongestion() {
    return _rtmpCamera.hasCongestion();
  }

  public boolean isAudioMuted() {
    return _rtmpCamera.isAudioMuted();
  }

  public void disableAudio() {
    _rtmpCamera.disableAudio();
  }

  public void enableAudio() {
    _rtmpCamera.enableAudio();
  }

  public void switchCamera() {
    _rtmpCamera.switchCamera();
  }

  public void startStream() {
    try {
      boolean isAudioPrepared = _rtmpCamera.prepareAudio();
      boolean isVideoPrepared = _rtmpCamera.prepareVideo();

      if (!isAudioPrepared || !isVideoPrepared || _publishURL == null) {
        return;
      }

      _rtmpCamera.startStream(_publishURL);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public void stopStream() {
    try {
      boolean isStreaming = _rtmpCamera.isStreaming();

      if (!isStreaming) {
        return;
      }

      _rtmpCamera.stopStream();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

}
