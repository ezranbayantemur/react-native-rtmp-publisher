package com.reactnativertmp;

import android.view.SurfaceView;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.testingapplication.rtmp.utils.Publisher;
import com.testingapplication.rtmp.utils.SurfaceHolderHelper;

import java.util.Map;

public class RTMPManager extends SimpleViewManager<SurfaceView> {
  //TODO: "Do not place Android context classes in static fields (static reference to Publisher which has field _surfaceView pointing to SurfaceView); this is a memory leak"
  public static Publisher publisher;
  public final String REACT_CLASS_NAME = "RCT_RTMPView";
  SurfaceView surfaceView;
  private ThemedReactContext _reactContext;
  View.OnLayoutChangeListener onLayoutChangeListener = new View.OnLayoutChangeListener() {
    @Override
    public void onLayoutChange(@NonNull View view, int i, int i1, int i2, int i3, int i4, int i5, int i6, int i7) {
      _reactContext
        .getJSModule(RCTEventEmitter.class)
        .receiveEvent(view.getId(), "onLayoutChange", null);
    }
  };

  @NonNull
  @Override
  public String getName() {
    return REACT_CLASS_NAME;
  }

  @NonNull
  @Override
  protected SurfaceView createViewInstance(@NonNull ThemedReactContext reactContext) {
    _reactContext = reactContext;
    surfaceView = new SurfaceView(_reactContext);
    publisher = new Publisher(_reactContext, surfaceView);
    surfaceView.addOnLayoutChangeListener(onLayoutChangeListener);

    SurfaceHolderHelper surfaceHolderHelper = new SurfaceHolderHelper(_reactContext, publisher.getRtmpCamera(), surfaceView.getId());
    surfaceView.getHolder().addCallback(surfaceHolderHelper);

    return surfaceView;
  }

  @ReactProp(name = "publishUrl")
  public void setPublishUrl(SurfaceView surfaceView, @Nullable String url) {
    publisher.setPublishURL(url);
  }


  @Nullable
  @Override
  public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
    return MapBuilder.of(
      "onLayoutChange",
      MapBuilder.of("registrationName", "onLayoutChange"),
      "onConnectionFailedRtmp",
      MapBuilder.of("registrationName", "onConnectionFailedRtmp"),
      "onConnectionStartedRtmp",
      MapBuilder.of("registrationName", "onConnectionStartedRtmp"),
      "onConnectionSuccessRtmp",
      MapBuilder.of("registrationName", "onConnectionSuccessRtmp"),
      "onDisconnectRtmp",
      MapBuilder.of("registrationName", "onDisconnectRtmp"),
      "onNewBitrateRtmp",
      MapBuilder.of("registrationName", "onNewBitrateRtmp")
    );
  }

}
