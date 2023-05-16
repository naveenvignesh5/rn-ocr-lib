import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  useWindowDimensions,
  Text,
  NativeEventEmitter,
  NativeModules,
  ScrollView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { getText, DataInputType, OcrEngineMode } from 'rn-ocr-lib';
import FastImage from 'react-native-fast-image';

const eventEmitter = new NativeEventEmitter(NativeModules.RnOcrLib);

export default function App() {
  const { width, height } = useWindowDimensions();

  const [text, setText] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [uri, setUri] = useState<string>('');

  const handlePickImage = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (res.didCancel) {
        return;
      }

      const [image] = res.assets || [];

      image && image.uri && setUri(image.uri);
    } catch (err) {}
  };

  const handleOcr = async (): Promise<void> => {
    try {
      getText(uri.replace('file://', ''), DataInputType.file, {
        ocrEngineMode: OcrEngineMode.ACCURATE,
        lang: ['eng', 'tam'],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClear = () => {
    setText('');
    setUri('');
    setProgress(0);
  };

  useEffect(() => {
    eventEmitter.addListener('finished', (event) => {
      setProgress(100);
      setText(event.text);
    });

    eventEmitter.addListener('progress', (event) => {
      setProgress(Math.round(event.percent));
    });

    return () => {
      eventEmitter.removeAllListeners('finished');
      eventEmitter.removeAllListeners('progress');
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.buttonContainer}>
          <Button title="Pick image" onPress={handlePickImage} />
          <Button title="Do OCR" onPress={handleOcr} />
          <Button title="Clear" onPress={handleClear} />
        </View>
        {!!progress && (
          <Text style={styles.progress}>Progress: {progress} %</Text>
        )}
        {uri && (
          <FastImage
            style={[styles.image, { width, height: height * 0.4 }]}
            source={{
              uri,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
        {text && <Text style={styles.textContent}>{text}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    backgroundColor: '#eee',
  },
  textContent: {
    margin: 12,
  },
  scrollContainer: {
    padding: 4,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    padding: 8,
    gap: 8,
  },
  progress: {
    textAlign: 'center',
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  button: {
    flex: 1,
  },
  picker: {
    flex: 1,
  },
});
