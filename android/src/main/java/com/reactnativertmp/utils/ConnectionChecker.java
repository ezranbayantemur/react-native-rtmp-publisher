package com.reactnativertmp.utils;

import androidx.annotation.NonNull;

import com.pedro.rtmp.utils.ConnectCheckerRtmp;
import com.reactnativertmp.interfaces.ConnectionListener;

import java.util.ArrayList;
import java.util.List;

public class ConnectionChecker implements ConnectCheckerRtmp {
  private final List<ConnectionListener> listeners = new ArrayList<>();

  public void addListener(ConnectionListener listener) {
    listeners.add(listener);
  }

  @Override
  public void onAuthErrorRtmp() {
    for (ConnectionListener l : listeners) {
      l.onChange("onAuthError");
    }
  }

  @Override
  public void onAuthSuccessRtmp() {
    for (ConnectionListener l : listeners) {
      l.onChange("onAuthSuccess");
    }
  }

  // TODO: Parameters will be send after onChange method updated
  @Override
  public void onConnectionFailedRtmp(@NonNull String s) {
    for (ConnectionListener l : listeners) {
      l.onChange("onConnectionFailed");
    }
  }

  // TODO: Parameters will be send after onChange method updated
  @Override
  public void onConnectionStartedRtmp(@NonNull String s) {
    for (ConnectionListener l : listeners) {
      l.onChange("onConnectionStarted");
    }
  }

  @Override
  public void onConnectionSuccessRtmp() {
    for (ConnectionListener l : listeners) {
      l.onChange("onConnectionSuccess");
    }
  }

  @Override
  public void onDisconnectRtmp() {
    for (ConnectionListener l : listeners) {
      l.onChange("onDisconnect");
    }
  }

  // TODO: Parameters will be send after onChange method updated
  @Override
  public void onNewBitrateRtmp(long b) {
    for (ConnectionListener l : listeners) {
      l.onChange("onNewBitrateReceived");
    }
  }
}
