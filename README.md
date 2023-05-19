# rn-ocr-lib

React native library to perform OCR on images. This library uses Tesseract library for image processing in android and vision library for iOS.

## Installation

```sh
npm install rn-ocr-lib
```

## Setup

### Android

Create folder `app/src/main/assets/tessdata`. Inside `tessdata` place `${lang}.traineddata`. You can get the train data files from [here](https://tesseract-ocr.github.io/tessdoc/Data-Files.html).

## Usage

Kindly refer the [example](example/) project for usage for Android and iOS.

## API Reference

### Methods

```javascript
import { getText, useOCREventListener } from 'rn-ocr-lib';
```

**getText**

Call this method to initiate image processing

```typescript
getText(data: string, dataInputType: DataInputType, options?: Partial<OCROptions>): void;
```

**useOCREventListener**

Call this hook to setup listener to listen to progress, result and error.

```typescript
useOCREventListener((event: OCREventType, data) => {
  if (event === OCREvent.FINISHED) {
    // console.log(data.text)
    return;
  }

  if (event === OCREvent.PROGRESS) {
    // console.log(data.percent)
    return;
  }

  if (event === OCREvent.ERROR) {
    // console.log(data.message)
  }
});
```

### Types

**DataInputType**

| Input type | Value  | Description        |
| ---------- | ------ | ------------------ |
| file       | FILE   | Path to image file |
| base64     | BASE64 | Base 64 string     |

**Options**

| Option        | iOS | Android | Default      | Description                                         |
| ------------- | --- | ------- | ------------ | --------------------------------------------------- |
| ocrEngineMode | Yes | Yes     | FAST         | Type of mode between fast or accurate recognization |
| pageSegMode   | No  | Yes     | PSM_OSD_ONLY | Page seg mode of tesseract                          |
| lang          | Yes | Yes     | ["eng"]      | Languages for which recognization is needed         |

**Types**

```typescript
enum OcrEngineMode {
  FAST, // 0
  ACCURATE, // 1
  FAST_ACCURATE, // 2 - for iOS equivalent to accurate
}

// Tesseract - https://tesseract-ocr.github.io/tessdoc/ImproveQuality.html#page-segmentation-method
enum PageSegMode {
  PSM_OSD_ONLY, // 0
  PSM_AUTO_OSD, // 1
  PSM_AUTO_ONLY, // 2
  PSM_AUTO, // 3
  PSM_SINGLE_COLUMN, // 4
  PSM_SINGLE_BLOCK_VERT_TEXT, // 5
  PSM_SINGLE_BLOCK, // 6
  PSM_SINGLE_LINE, // 7
  PSM_SINGLE_WORD, // 8
  PSM_CIRCLE_WORD, // 9
  PSM_SINGLE_CHAR, // 10
  PSM_SPARSE_TEXT, // 11
  PSM_SPARSE_TEXT_OSD, // 12
  PSM_RAW_LINE, // 13
}
```

## Language Support

### Android

[Here](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html) is the list of supported languages for android.

### iOS

Vision library currently has limited language support. It supports the following languages.

| Language            | Code    |
| ------------------- | ------- |
| English             | eng     |
| France              | fra     |
| Italian             | ita     |
| German              | deu     |
| Spanish             | spa     |
| Portuguese          | por     |
| Chinese Simplified  | chi_sim |
| Chinese Traditional | chi_tra |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
