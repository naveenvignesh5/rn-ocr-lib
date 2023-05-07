package com.rnocrlib;

import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import com.googlecode.tesseract.android.TessBaseAPI;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class OCRUtil {
    // tesseract base api instances for mrz and english train data models
    private TessBaseAPI baseApi;
    private int pageMode = TessBaseAPI.PageSegMode.PSM_SINGLE_BLOCK;

    // override constructor with context as argument
    public OCRUtil(Context ctx) throws IOException {
        // extract files to local storage to have it readable for tesseract api
        extractTrainData(ctx);

        // initialize apis for english and mrz text
        baseApi = new TessBaseAPI();

        // set page mode for block text recognization
        baseApi.setPageSegMode(pageMode);

        // get traindata path from local storage
        String dataPath = ctx.getFilesDir().getPath();

        // create file instance from traindata folder
        File f = new File(dataPath);

        // initialize the app with data model if directory is present
        if (f.exists()) {
            baseApi.init(dataPath, "eng");
        }
    }

    public void setPageSegMode(int pageMode) {
        this.pageMode = pageMode;
    }

    // call tesseract api and recognize english text from bitmap image
    public String getText(Bitmap image) {
        // set image to tesseract api instance for mrz
        baseApi.setImage(image);

        // get text
        String text = baseApi.getUTF8Text();

        // return the result
        return text;
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
    private void extractTrainData(Context ctx) throws IOException {
        // asset manager instance
        AssetManager assetManager = ctx.getAssets();

        // get files from asset manager
        String[] files = assetManager.list("tessdata");

        // data path where traindata files will be copied
        String dataPath = ctx.getFilesDir().getPath() + File.separator + "tessdata/";

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

    public Bitmap base64ToBitmap(String encodedImage) {
        byte[] decodedString = Base64.decode(encodedImage, Base64.DEFAULT);
        Bitmap decodedByte = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
        return decodedByte;
    }
}
