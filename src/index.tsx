import { NativeModules, Platform } from 'react-native';
import { DataInputType, OCROptions, PageSetMode } from './types';

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

const defaultOptions: Partial<OCROptions> = {
  pageSetMode: PageSetMode.PSM_SINGLE_BLOCK,
};

export const getText = (
  data: string,
  inputType: DataInputType,
  options?: OCROptions
): void => {
  const { pageSetMode } = options || defaultOptions;
  RnOcrLib.getText(data, inputType, pageSetMode);
};

export { DataInputType, OCROptions, PageSetMode };
