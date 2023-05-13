import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  View,
  Button,
  useWindowDimensions,
  Text,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNFetchBlob from 'rn-fetch-blob';

import { getText, DataInputType } from 'rn-ocr-lib';

const IMAGE_URL: string =
  'https://chillyfacts.com/wp-content/uploads/2018/11/ocr-sample2.png';

const eventEmitter = new NativeEventEmitter(NativeModules.RnOcrLib);

export default function App() {
  const { width } = useWindowDimensions();

  const [text, setText] = useState<string>('');

  const handleOcr = async (): Promise<void> => {
    try {
      const fetchRes = await RNFetchBlob.fetch('GET', IMAGE_URL);
      const base64 = fetchRes.base64();
      getText(base64, DataInputType.base64);
    } catch (err) {}
  };

  useEffect(() => {
    eventEmitter.addListener('finished', (event) => {
      setText(event.text);
    });

    eventEmitter.addListener('progress', (event) => {
      console.log('percent', event.percent);
    });

    return () => {
      eventEmitter.removeAllListeners('finished');
      eventEmitter.removeAllListeners('progress');
    };
  }, []);

  return (
    <View style={styles.container}>
      <FastImage
        style={[styles.image, { width }]}
        source={{
          uri: IMAGE_URL,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Button title="Do OCR" onPress={handleOcr} />
      {text && <Text style={styles.textContent}>{text}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: 180,
  },
  textContent: {
    margin: 12,
  },
});
