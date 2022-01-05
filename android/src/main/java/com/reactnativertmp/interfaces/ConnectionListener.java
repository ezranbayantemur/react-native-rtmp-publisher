package com.reactnativertmp.interfaces;

public interface ConnectionListener {
    //TODO: Can convert to much more generic type like => onChange(String type, Object data);
    void onChange(String type);
}
