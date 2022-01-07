package com.reactnativertmppublisher.modules;


import android.view.SurfaceHolder;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.ThemedReactContext;
import com.pedro.rtplibrary.rtmp.RtmpCamera1;

public class SurfaceHolderHelper implements SurfaceHolder.Callback {
  private final RtmpCamera1 _rtmpCamera1;

  public SurfaceHolderHelper(ThemedReactContext reactContext, RtmpCamera1 rtmpCamera1, int surfaceId) {
    _rtmpCamera1 = rtmpCamera1;
  }

  @Override
  public void surfaceCreated(@NonNull SurfaceHolder surfaceHolder) {

  }

  @Override
  public void surfaceChanged(@NonNull SurfaceHolder surfaceHolder, int i, int i1, int i2) {
    _rtmpCamera1.startPreview();
  }

  @Override
  public void surfaceDestroyed(@NonNull SurfaceHolder surfaceHolder) {
    _rtmpCamera1.stopPreview();
  }

}
