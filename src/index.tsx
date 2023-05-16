import { NativeModules, Platform } from 'react-native';
import { DataInputType, OCROptions, PageSegMode, langMapping } from './types';

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
  pageSegMode: PageSegMode.PSM_SINGLE_BLOCK,
  lang: 'eng',
};

export const getText = (
  data: string,
  inputType: DataInputType,
  options?: Partial<OCROptions>
): void => {
  const finalOptions = {
    ...defaultOptions,
    ...options,
  };

  if (finalOptions.lang && Platform.OS === 'ios') {
    finalOptions.lang = langMapping[finalOptions.lang];
  }

  if (inputType === DataInputType.base64) {
    data = data.replace(new RegExp('^data:image/[^;]*;base64,?', 'gi'), '');
  }

  RnOcrLib.getText(data, inputType, finalOptions);
};

export { DataInputType, OCROptions, PageSegMode };
