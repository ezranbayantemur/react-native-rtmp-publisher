package com.reactnativertmppublisher.interfaces;

import androidx.annotation.Nullable;

public interface ConnectionListener {
    void onChange(String type, @Nullable Object data);
}
