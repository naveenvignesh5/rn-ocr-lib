# rn-ocr-lib

React native library to perform OCR on images

## Installation

```sh
npm install rn-ocr-lib
```

## Usage

```js
import { ocr } from 'rn-ocr-lib';

// pass base64 string data:image/png;base64,iVBORw0... without data part

const result = await ocr('iVBORw0...');
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
