package com.reactnativertmppublisher.modules;

import android.content.Context;
import android.media.AudioManager;
import android.media.MediaRecorder;
import android.util.Log;
import android.view.SurfaceView;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.pedro.rtplibrary.rtmp.RtmpCamera1;
import com.reactnativertmppublisher.enums.AudioInputType;
import com.reactnativertmppublisher.enums.StreamState;
import com.reactnativertmppublisher.interfaces.ConnectionListener;
import com.reactnativertmppublisher.utils.ObjectCaster;

public class Publisher {
  private final SurfaceView _surfaceView;
  private final RtmpCamera1 _rtmpCamera;
  private final ThemedReactContext _reactContext;
  private final AudioManager _mAudioManager;
  private String _streamUrl;
  private String _streamName;
  ConnectionChecker _connectionChecker = new ConnectionChecker();
  BluetoothDeviceConnector _bluetoothDeviceConnector;

  public Publisher(ThemedReactContext reactContext, SurfaceView surfaceView) {
    _reactContext = reactContext;
    _surfaceView = surfaceView;
    _rtmpCamera = new RtmpCamera1(surfaceView, _connectionChecker);
    _bluetoothDeviceConnector = new BluetoothDeviceConnector(reactContext);

    _bluetoothDeviceConnector.addListener(createBluetoothDeviceListener());
    _connectionChecker.addListener(createConnectionListener());
    _mAudioManager = (AudioManager) reactContext.getSystemService(Context.AUDIO_SERVICE);

    setAudioInput(AudioInputType.SPEAKER);
  }

  public RtmpCamera1 getRtmpCamera() {
    return _rtmpCamera;
  }

  public ConnectionListener createConnectionListener() {
    return (type, data) -> {
      eventEffect(type);
      WritableMap eventData = ObjectCaster.caster(data);

        _reactContext
          .getJSModule(RCTEventEmitter.class)
          .receiveEvent(_surfaceView.getId(), type, eventData);
    };
  }

  public ConnectionListener createBluetoothDeviceListener(){
    return (type, data) -> {
      eventEffect(type);
      WritableMap eventData = ObjectCaster.caster(data);

      _reactContext
        .getJSModule(RCTEventEmitter.class)
        .receiveEvent(_surfaceView.getId(), type, eventData);
    };
  }

  private void eventEffect(@NonNull String eventType) {
    switch (eventType) {
      case "onConnectionStarted": {
        WritableMap event = Arguments.createMap();
        event.putString("data", String.valueOf(StreamState.CONNECTING));

        _reactContext
          .getJSModule(RCTEventEmitter.class)
          .receiveEvent(_surfaceView.getId(), "onStreamStateChanged", event);
        break;
      }

      case "onConnectionSuccess": {
        WritableMap event = Arguments.createMap();
        event.putString("data", String.valueOf(StreamState.CONNECTED));

        _reactContext
          .getJSModule(RCTEventEmitter.class)
          .receiveEvent(_surfaceView.getId(), "onStreamStateChanged", event);
        break;
      }

      case "onDisconnect": {
        WritableMap event = Arguments.createMap();
        event.putString("data", String.valueOf(StreamState.DISCONNECTED));

        _reactContext
          .getJSModule(RCTEventEmitter.class)
          .receiveEvent(_surfaceView.getId(), "onStreamStateChanged", event);
        break;
      }

      case "onConnectionFailed": {
        WritableMap event = Arguments.createMap();
        event.putString("data", String.valueOf(StreamState.FAILED));

        _reactContext
          .getJSModule(RCTEventEmitter.class)
          .receiveEvent(_surfaceView.getId(), "onStreamStateChanged", event);
        break;
      }
    }
  }


  //region COMPONENT METHODS
  public String getPublishURL() {
    return _streamUrl + "/" + _streamName;
  }

  public void setStreamUrl(String _streamUrl) {
    this._streamUrl = _streamUrl;
  }

  public void setStreamName(String _streamName) {
    this._streamName = _streamName;
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

  public void toggleFlash() {
    try {
      if(_rtmpCamera.isLanternEnabled()){
        _rtmpCamera.disableLantern();
        return;
      }

      _rtmpCamera.enableLantern();
    }
    catch (Exception e){
      e.printStackTrace();
    }
  }

  public void startStream() {
    try {
      boolean isAudioPrepared = _rtmpCamera.prepareAudio(MediaRecorder.AudioSource.DEFAULT, 128 * 1024, 44100, true, false, false);
      boolean isVideoPrepared = _rtmpCamera.prepareVideo(1280 , 720, 3000 * 1024);

      if (!isAudioPrepared || !isVideoPrepared || _streamName == null || _streamUrl == null) {
        return;
      }

      String url = _streamUrl + "/" + _streamName;
      _rtmpCamera.startStream(url);
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

  public void setAudioInput(@NonNull AudioInputType audioInputType){
    System.out.println(audioInputType);
    switch (audioInputType){
      case BLUETOOTH_HEADSET: {
        System.out.println("ble");
        try{
          _mAudioManager.startBluetoothSco();
          _mAudioManager.setBluetoothScoOn(true);
          break;
        }
        catch (Exception error){
          System.out.println(error);
          break;
        }
      }

      case SPEAKER:{
        try{
          if(_mAudioManager.isBluetoothScoOn()){
            _mAudioManager.stopBluetoothSco();
            _mAudioManager.setBluetoothScoOn(false);
          }

          _mAudioManager.setSpeakerphoneOn(true);
          break;
        }
        catch (Exception error){
          System.out.println(error);
          break;
        }
      }
    }
  }
  //endregion

}
