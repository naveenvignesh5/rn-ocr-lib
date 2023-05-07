import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  Button,
  useWindowDimensions,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNFetchBlob from 'rn-fetch-blob';

import { ocr } from 'rn-ocr-lib';

const IMAGE_URL: string =
  'https://chillyfacts.com/wp-content/uploads/2018/11/ocr-sample2.png';

export default function App() {
  const { width } = useWindowDimensions();

  const [text, setText] = useState<string>('');

  const handleOcr = async (): Promise<void> => {
    try {
      const fetchRes = await RNFetchBlob.fetch('GET', IMAGE_URL);
      const base64 = fetchRes.base64();
      const res = await ocr(base64);
      setText(res);
    } catch (err) {}
  };

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
