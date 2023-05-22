# rn-ocr-lib

React native library to perform OCR on images. This library uses Tesseract library for image processing in android and vision library for iOS.

[![Npm package version](https://badgen.net/npm/v/rn-ocr-lib)](https://npmjs.com/package/rn-ocr-lib) [![Npm package monthly downloads](https://badgen.net/npm/dm/rn-ocr-lib)](https://npmjs.com/package/rn-ocr-lib) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white) ![iOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white)

## Showcase

<img alt="Demo" src="media/demo.gif" width="300">

## Installation

```sh
npm install rn-ocr-lib
# or
yarn add rn-ocr-lib
```

## Setup

### Android

Create folder `app/src/main/assets/tessdata`. Inside `tessdata` place `${lang}.traineddata`. You can get the train data files from [here](https://tesseract-ocr.github.io/tessdoc/Data-Files.html).

### iOS

Vision library is present in iOS from version 13 or above. So update `ios/Podfile`.

```ruby
platform :ios, '13.0'
```

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
useOCREventListener(
  (event: OCREventType, ocrEventResponse: OCREventResponse) => {
    switch (event) {
      case OCREvent.FINISHED:
        return;
      case OCREvent.PROGRESS:
        return;
      case OCREvent.ERROR:
        return;
      default:
        return;
    }
  }
);
```

### Parameters

**dataInputType**

| Input type | Value  | Description        |
| ---------- | ------ | ------------------ |
| file       | FILE   | Path to image file |
| base64     | BASE64 | Base64 string      |

\
**options**

| Option        | Type          | iOS | Android | Default      | Description                                         |
| ------------- | ------------- | --- | ------- | ------------ | --------------------------------------------------- |
| ocrEngineMode | OCREngineMode | Yes | Yes     | FAST         | Type of mode between fast or accurate recognization |
| pageSegMode   | PageSegMode   | No  | Yes     | PSM_OSD_ONLY | Page seg mode of tesseract                          |
| lang          | string[]      | Yes | Yes     | ["eng"]      | Languages for which recognization is needed         |

\
**ocrEngineMode**

| Engine Mode   | Value | Description                                                                                                                                           |
| ------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| FAST          | 0     | Fast mode where recognization will be faster but mismatch of words is possible                                                                        |
| ACCURATE      | 1     | Accurate mode where time to process is more but more accurate text will be obtained                                                                   |
| FAST_ACCURATE | 2     | Relavant for android tesseract where train data is provided for accurate and fast results but traindata file may be bigger compared to previous modes |

\
**pageSegMode (Android)**

By default Tesseract expects a page of text when it segments an image. If you’re just seeking to OCR a small region, try a different segmentation mode.

| Segmentation Mode          | Value | Description                                                                                   |
| -------------------------- | ----- | --------------------------------------------------------------------------------------------- |
| PSM_OSD_ONLY               | 0     | Orientation and script detection (OSD) only.                                                  |
| PSM_AUTO_OSD               | 1     | Automatic page segmentation with OSD.                                                         |
| PSM_AUTO_ONLY              | 2     | Automatic page segmentation, but no OSD, or OCR.                                              |
| PSM_AUTO                   | 3     | Fully automatic page segmentation, but no OSD. (Default)                                      |
| PSM_SINGLE_COLUMN          | 4     | Assume a single column of text of variable sizes.                                             |
| PSM_SINGLE_BLOCK_VERT_TEXT | 5     | Assume a single uniform block of vertically aligned text.                                     |
| PSM_SINGLE_BLOCK           | 6     | Assume a single uniform block of text.                                                        |
| PSM_SINGLE_LINE            | 7     | Treat the image as a single text line.                                                        |
| PSM_SINGLE_WORD            | 8     | Treat the image as a single word.                                                             |
| PSM_CIRCLE_WORD            | 9     | Treat the image as a single word in a circle.                                                 |
| PSM_SINGLE_CHAR            | 10    | Treat the image as a single character.                                                        |
| PSM_SPARSE_TEXT            | 11    | Sparse text. Find as much text as possible in no particular order.                            |
| PSM_SPARSE_TEXT_OSD        | 12    | Sparse text with OSD.                                                                         |
| PSM_RAW_LINE               | 13    | Raw line. Treat the image as a single text line, bypassing hacks that are Tesseract-specific. |

\
**event**

| Event type | Value    | Description                                          |
| ---------- | -------- | ---------------------------------------------------- |
| FINISHED   | finished | Event when OCR completes                             |
| PROGRESS   | progress | Progress event when OCR is processing                |
| ERROR      | error    | Error event OCR fails and some error is being thrown |

\
**ocrEventResponse**

| Key      | Type   | Description      |
| -------- | ------ | ---------------- |
| text     | string | Result text      |
| progress | number | Progress percent |
| message  | string | Error message    |

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
