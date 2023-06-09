package com.rnocrlib;

import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;

import com.googlecode.tesseract.android.TessBaseAPI;
import com.googlecode.tesseract.android.TessBaseAPI.ProgressNotifier;
import com.googlecode.tesseract.android.TessBaseAPI.ProgressValues;
import com.googlecode.tesseract.android.TessBaseAPI.PageSegMode;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.StringBuilder;

public class OCRUtil {
    // tesseract base api instances for mrz and english train data models
    private ReactApplicationContext context;

    private TessBaseAPI baseApi;
    private int pageMode = PageSegMode.PSM_SINGLE_BLOCK;

    private static final String PROGRESS_EVENT = "progress";
    private static final String ERROR_EVENT = "error";
    private static final String FINISHED_EVENT = "finished";

    // override constructor with context as argument
    public OCRUtil(ReactApplicationContext ctx) throws IOException {
        context = ctx;

        // extract files to local storage to have it readable for tesseract api
        extractTrainData(context);

        initTessBaseApi();
    }

    private void emitProgress(int percent) {
        WritableMap params = Arguments.createMap();
        params.putInt("percent", percent);

        sendEvent(context, PROGRESS_EVENT, params);
    }

    private void initTessBaseApi() {
        baseApi = new TessBaseAPI(new ProgressNotifier() {
            @Override
            public void onProgressValues(ProgressValues progressValues) {
                int percent = progressValues.getPercent();
                emitProgress(percent);
            }
        });

        baseApi.setPageSegMode(pageMode);
    }

    private boolean initTessLangModel(ReadableArray lang, int ocrEngineMode) {
        // get traindata path from local storage
        String dataPath = context.getFilesDir().getPath();

        // create file instance from traindata folder
        File f = new File(dataPath);

        // initialize the app with data model if directory is present
        if (f.exists()) {
            return baseApi.init(dataPath, joinReadableArray(lang, "+"), ocrEngineMode);
        }

        return false;
    }

    private String joinReadableArray(ReadableArray array, String joiner) {
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < array.size(); i++) {
            if (i > 0) {
                result.append(joiner);
            }

            result.append(array.getString(i));
        }

        return result.toString();
    }

    // call tesseract api and recognize english text from bitmap image
    public void getText(String data, String ocrInputType, ReadableMap ocrOptions) throws IOException {
        int pageSegMode = ocrOptions.getInt("pageSegMode");
        int ocrEngineMode = ocrOptions.getInt("ocrEngineMode");
        ReadableArray lang = ocrOptions.getArray("lang");

        new Thread(() -> {
            WritableMap params = Arguments.createMap();

            if (!initTessLangModel(lang, ocrEngineMode)) {
                params.putString("error", "Unable to initialize tesseract");
                sendEvent(context, ERROR_EVENT, params);
                return;
            }

            baseApi.setPageSegMode(pageSegMode);

            if (ocrInputType.equals("BASE64")) {
                baseApi.setImage(ImageUtil.base64ToBitmap(data));
            } else {
                baseApi.setImage(new File(data));
            }

            baseApi.getHOCRText(0);
            String text = baseApi.getUTF8Text();

            params.putString("text", text);
            sendEvent(context, FINISHED_EVENT, params);
            emitProgress(100);
        }).start();
    }

    // copy file from src to dest
    private void copyFile(InputStream in, OutputStream out) throws IOException {
        // create byte array for data chunks
        byte[] buffer = new byte[1024];

        // int to maintain read buffer pointer
        int read;

        // loop till read flag is -1
        while ((read = in.read(buffer)) != -1) {
            // write buffer into output stream
            out.write(buffer, 0, read);
        }
    }

    // extract train data from assets to cache folder
    private void extractTrainData(ReactApplicationContext ctx) throws IOException {
        // asset manager instance
        AssetManager assetManager = ctx.getAssets();

        // get files from asset manager
        String[] files = assetManager.list("tessdata");

        // data path where traindata files will be copied
        String dataPath = context.getApplicationContext().getFilesDir().getPath() + File.separator + "tessdata/";

        // instances for input and output stream
        InputStream inputStream;
        OutputStream outputStream;

        // directory where train data
        File dataFileDir = new File(dataPath);

        // create directory if directory does not exist
        if (!dataFileDir.exists()) {
            dataFileDir.mkdirs();
        }

        // loop through filenames of assets
        for (String fileName : files) {
            // create file instance to have traindata from assets to be written to local
            // storage
            File dataFile = new File(dataPath, fileName);

            // if file is empty
            if (!dataFile.exists()) {
                // open file stream from asset manager
                inputStream = assetManager.open("tessdata/" + fileName);

                // create output stream
                outputStream = new FileOutputStream(dataPath + fileName);

                // copy write file from assets to local storage
                copyFile(inputStream, outputStream);

                // close input stream
                inputStream.close();

                // flush and close output stream
                outputStream.flush();
                outputStream.close();
            }
        }
    }

    private void sendEvent(
            ReactApplicationContext reactContext,
            String eventName,
            @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
