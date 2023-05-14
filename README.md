# rn-ocr-lib

React native library to perform OCR on images.

**Note:**

- For now only available for Android
- iOS version is being built

## Installation

```sh
npm install rn-ocr-lib
```

## Usage

```JSX
import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Button,
  useWindowDimensions,
  Text,
  NativeEventEmitter,
  NativeModules,
  ScrollView,
} from 'react-native';
import { getText, DataInputType } from 'rn-ocr-lib';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
  },
  result: {
    marginTop: 10,
  }
});

// replace with valid base64 string - https://base64.guru/converter/encode/image
const IMAGE_DATA: string = "data:image/png;base64,iVBORw0...";

const App = () => {
  const [res, setRes] = useState("");
  // const [progress, setProgress] = useState(0);

  const { height } = useWindowDimensions();

  const handleOCR = () => {
    getText(IMAGE_DATA, DataInputType.base64);
  }

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.RnOcrLib);

    eventEmitter.addListener('finished', (event) => {
      // setProgress(100);
      setText(event.text);
    });

    // add progress to percent
    // eventEmitter.addListener('progress', (event) => {
    //   setProgress(event.percent);
    // });

    return () => {
      eventEmitter.removeAllListeners('finished');
      eventEmitter.removeAllListeners('progress');
    };
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Do OCR" onPress={handleOCR} />
      <Image
        style={{ height: height * 0.5 }}
        source={{
          uri: IMAGE_DATA
        }}
      />
      {!!res && <Text style={styles.result}>{res}</Text>}
    </View>
  );
};
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
