package com.reactnativertmppublisher.modules;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothProfile;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

import com.reactnativertmppublisher.enums.BluetoothDeviceStatuses;
import com.reactnativertmppublisher.interfaces.ConnectionListener;

import java.util.ArrayList;
import java.util.List;

public class BluetoothDeviceConnector extends BroadcastReceiver implements BluetoothProfile.ServiceListener{
  private final List<ConnectionListener> listeners = new ArrayList<>();

  public void addListener(ConnectionListener listener) {
    listeners.add(listener);
  }

  public BluetoothDeviceConnector(Context context) {
    BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
    mBluetoothAdapter.getProfileProxy(context, this, BluetoothProfile.HEADSET);
    context.registerReceiver(this, new IntentFilter(BluetoothAdapter.ACTION_CONNECTION_STATE_CHANGED));
  }

  @Override
  public void onServiceConnected(int i, BluetoothProfile bluetoothProfile) {
    if(bluetoothProfile.getConnectedDevices().size() > 0) {
        for (ConnectionListener l : listeners) {
        l.onChange("onBluetoothDeviceStatusChanged", BluetoothDeviceStatuses.CONNECTED.toString());
      }
    }
  }

  @Override
  public void onServiceDisconnected(int i) {
    for (ConnectionListener l : listeners) {
      l.onChange("onBluetoothDeviceStatusChanged", BluetoothDeviceStatuses.DISCONNECTED.toString());
    }
  }

  @Override
  public void onReceive(Context context, Intent intent) {
    int status = intent.getIntExtra(BluetoothAdapter.EXTRA_CONNECTION_STATE, -1);

    switch (status){
      case BluetoothAdapter.STATE_CONNECTING: {
        for (ConnectionListener l : listeners) {
          l.onChange("onBluetoothDeviceStatusChanged", BluetoothDeviceStatuses.CONNECTING.toString());
        };
        break;
      }

      case BluetoothAdapter.STATE_CONNECTED: {
        for (ConnectionListener l : listeners) {
          l.onChange("onBluetoothDeviceStatusChanged", BluetoothDeviceStatuses.CONNECTED.toString());
        };
        break;
      }

      case BluetoothAdapter.STATE_DISCONNECTED: {
        for (ConnectionListener l : listeners) {
          l.onChange("onBluetoothDeviceStatusChanged", BluetoothDeviceStatuses.DISCONNECTED.toString());
        };
        break;
      }
    };

  }
}
