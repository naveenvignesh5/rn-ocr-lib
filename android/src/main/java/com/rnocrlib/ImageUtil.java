package com.rnocrlib;

import java.io.IOException;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

public class ImageUtil {
    public static Bitmap base64ToBitmap(String base64String) {
        final String dataPartRegex = "^data:image/[^;]*;base64,?";

        // check and remove data:image/png;base,xxx | data:image/jpeg;base64,xxx
        if (base64String.matches(dataPartRegex)) {
            base64String = base64String.replaceFirst(dataPartRegex, "");
        }

        byte[] decodedString = Base64.decode(base64String, Base64.DEFAULT);
        return BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
    }
}
