import { NativeModules, Platform } from 'react-native';
import {
  DataInputType,
  OCROptions,
  OcrEngineMode,
  PageSegMode,
  iOSLangMapping,
  tesseractSupportedLanguages,
} from './types';

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

const defaultOptions: OCROptions = {
  pageSegMode: PageSegMode.PSM_SINGLE_BLOCK,
  ocrEngineMode: OcrEngineMode.FAST,
  lang: ['eng'],
};

const tessLangMap: Record<string, boolean> = tesseractSupportedLanguages.reduce(
  (acc, o) => ({
    ...acc,
    [o]: true,
  }),
  {}
);

export const getText = (
  data: string,
  inputType: DataInputType,
  options?: Partial<OCROptions>
): void => {
  const finalOptions = {
    ...defaultOptions,
    ...options,
  };

  if (Platform.OS === 'ios') {
    finalOptions.lang = (finalOptions.lang || []).reduce((acc: string[], o) => {
      if (iOSLangMapping[o]) {
        acc.push(iOSLangMapping[o] || '');
      }

      return acc;
    }, []);
  } else {
    finalOptions.lang = finalOptions.lang.filter((o) => tessLangMap[o]);
  }

  if (!finalOptions.lang.length) {
    throw new Error('Unsupported language');
  }

  if (inputType === DataInputType.base64) {
    data = data.replace(new RegExp('^data:image/[^;]*;base64,?', 'gi'), '');
  }

  RnOcrLib.getText(data, inputType, finalOptions);
};

export { DataInputType, OCROptions, PageSegMode, OcrEngineMode };
