package com.reactnativertmppublisher.utils;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

public class ObjectCaster {
  public static WritableMap caster(@Nullable Object data){
    WritableMap event = Arguments.createMap();

    if(data == null){
      event.putNull("data");
    }

    if(data instanceof String){
      event.putString("data", (String) data);
    }

    if(data instanceof Integer){
      event.putInt("data", (Integer) data);
    }

    if(data instanceof Boolean){
      event.putBoolean("data", (Boolean) data);
    }

    if(data instanceof Long){
      event.putDouble("data", (Long) data);
    }

    return event;
  }
}
