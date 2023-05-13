import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'rn-ocr-lib' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const RnOcrLib = NativeModules.RnOcrLib
  ? NativeModules.RnOcrLib
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export enum DataInputType {
  file = 'FILE',
  base64 = 'BASE64',
}

export const getText = (
  data: string,
  inputType: DataInputType
): Promise<void> => RnOcrLib.getText(data, inputType);
