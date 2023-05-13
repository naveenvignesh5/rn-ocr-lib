package com.rnocrlib;

import androidx.annotation.NonNull;

import java.io.IOException;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import android.util.Base64;

@ReactModule(name = RnOcrLibModule.NAME)
public class RnOcrLibModule extends ReactContextBaseJavaModule {
  public static final String NAME = "RnOcrLib";

  private OCRUtil ocrUtil;

  public RnOcrLibModule(ReactApplicationContext reactContext) {
    super(reactContext);
    try {
      ocrUtil = new OCRUtil(reactContext);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void addListener(String eventName) {
  }

  @ReactMethod
  public void removeListeners(Integer count) {
  }

  @ReactMethod
  public void getText(String data, String ocrInputType, int pageSegMode, Promise promise) {
    if (data.isEmpty()) {
      promise.reject(ocrInputType + " data is empty");
      return;
    }

    try {
      ocrUtil.getText(data, ocrInputType, pageSegMode);
      promise.resolve("");
    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }
}
