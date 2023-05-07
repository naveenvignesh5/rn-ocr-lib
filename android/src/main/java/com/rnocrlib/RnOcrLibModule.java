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
      ocrUtil = new OCRUtil(reactContext.getApplicationContext());
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void multiply(double a, double b, Promise promise) {
    promise.resolve(a * b);
  }

  @ReactMethod
  public void ocr(String base64String, Promise promise) {
    if (base64String.isEmpty()) {
      promise.reject("base64 data is empty");
      return;
    }

    try {
      String ocrText = ocrUtil.getText(ocrUtil.base64ToBitmap(base64String));
      promise.resolve(ocrText);
    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }
}
