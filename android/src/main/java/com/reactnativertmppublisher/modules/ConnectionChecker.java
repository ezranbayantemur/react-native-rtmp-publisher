package com.reactnativertmppublisher.modules;

import androidx.annotation.NonNull;

import com.pedro.rtmp.utils.ConnectCheckerRtmp;
import com.reactnativertmppublisher.interfaces.ConnectionListener;

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
      l.onChange("onAuthError", null);
    }
  }

  @Override
  public void onAuthSuccessRtmp() {
    for (ConnectionListener l : listeners) {
      l.onChange("onAuthSuccess", null);
    }
  }

  // TODO: Parameters will be send after onChange method updated
  @Override
  public void onConnectionFailedRtmp(@NonNull String s) {
    for (ConnectionListener l : listeners) {
      l.onChange("onConnectionFailed", null);
    }
  }

  // TODO: Parameters will be send after onChange method updated
  @Override
  public void onConnectionStartedRtmp(@NonNull String s) {
    for (ConnectionListener l : listeners) {
      l.onChange("onConnectionStarted", null);
    }
  }

  @Override
  public void onConnectionSuccessRtmp() {
    for (ConnectionListener l : listeners) {
      l.onChange("onConnectionSuccess", null);
    }
  }

  @Override
  public void onDisconnectRtmp() {
    for (ConnectionListener l : listeners) {
      l.onChange("onDisconnect", null);
    }
  }

  // TODO: Parameters will be send after onChange method updated
  @Override
  public void onNewBitrateRtmp(long b) {
    for (ConnectionListener l : listeners) {
      l.onChange("onNewBitrateReceived", b);
    }
  }
}
