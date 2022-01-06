package com.reactnativertmp.interfaces;

import androidx.annotation.Nullable;

public interface ConnectionListener {
    //TODO: Can convert to much more generic type like => onChange(String type, Object data);
    void onChange(String type, @Nullable Object data);
}
