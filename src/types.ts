export enum PageSegMode {
  PSM_OSD_ONLY,
  PSM_AUTO_OSD,
  PSM_AUTO_ONLY,
  PSM_AUTO,
  PSM_SINGLE_COLUMN,
  PSM_SINGLE_BLOCK_VERT_TEXT,
  PSM_SINGLE_BLOCK,
  PSM_SINGLE_LINE,
  PSM_SINGLE_WORD,
  PSM_CIRCLE_WORD,
  PSM_SINGLE_CHAR,
  PSM_SPARSE_TEXT,
  PSM_SPARSE_TEXT_OSD,
  PSM_RAW_LINE,
}

export enum OcrEngineMode {
  FAST,
  ACCURATE,
  FAST_ACCURATE,
}

export enum DataInputType {
  file = 'FILE',
  base64 = 'BASE64',
}

export enum OCREvent {
  FINISHED = 'finished',
  ERROR = 'error',
  PROGRESS = 'progress',
}

interface OCREventResponse {
  text: string;
  percent: number;
  error: string;
}

export interface OCROptions {
  pageSegMode: PageSegMode;
  ocrEngineMode: OcrEngineMode;
  lang: string[];
}

export type OCREventListenerCallback = (
  event: OCREvent,
  data: OCREventResponse
) => void;

export const iOSLangMapping: Record<string, string> = {
  eng: 'en-US',
  fra: 'fr-FR',
  ita: 'it-IT',
  deu: 'de-DE',
  spa: 'es-ES',
  por: 'pt-BR',
  chi_sim: 'zh-Hans',
  chi_tra: 'zh-Hant',
};

export const tesseractSupportedLanguages: string[] = [
  'afr', // Afrikaans
  'amh', // Amharic
  'ara', // Arabic
  'asm', // Assamese
  'aze', // Azerbaijani
  'aze_cyrl', // Azerbaijani (Cyrillic script)
  'bel', // Belarusian
  'ben', // Bengali
  'bod', // Tibetan
  'bos', // Bosnian
  'bre', // Breton
  'bul', // Bulgarian
  'cat', // Catalan
  'ceb', // Cebuano
  'ces', // Czech
  'chi_sim', // Simplified Chinese
  'chi_tra', // Traditional Chinese
  'chr', // Cherokee
  'cym', // Welsh
  'dan', // Danish
  'deu', // German
  'dzo', // Dzongkha
  'ell', // Greek
  'eng', // English
  'enm', // Middle English
  'epo', // Esperanto
  'est', // Estonian
  'eus', // Basque
  'fao', // Faroese
  'fas', // Persian
  'fin', // Finnish
  'fra', // French
  'frk', // Frankish
  'frm', // Middle French
  'fry', // Frisian
  'gla', // Scottish Gaelic
  'gle', // Irish
  'glg', // Galician
  'grc', // Ancient Greek
  'guj', // Gujarati
  'hat', // Haitian Creole
  'heb', // Hebrew
  'hin', // Hindi
  'hrv', // Croatian
  'hun', // Hungarian
  'iku', // Inuktitut
  'ind', // Indonesian
  'isl', // Icelandic
  'ita', // Italian
  'ita_old', // Old Italian
  'jav', // Javanese
  'jpn', // Japanese
  'kan', // Kannada
  'kat', // Georgian
  'kat_old', // Old Georgian
  'kaz', // Kazakh
  'khm', // Khmer
  'kir', // Kyrgyz
  'kmr', // Kurmanji (Kurdish)
  'kor', // Korean
  'kor_vert', // Korean vertical
  'kur', // Sorani (Kurdish)
  'lao', // Lao
  'lat', // Latin
  'lav', // Latvian
  'lit', // Lithuanian
  'mal', // Malayalam
  'mar', // Marathi
  'mkd', // Macedonian
  'mlt', // Maltese
  'msa', // Malay
  'mya', // Myanmar (Burmese)
  'nep', // Nepali
  'nld', // Dutch
  'nor', // Norwegian
  'oci', // Occitan
  'ori', // Odia (Oriya)
  'osd', // Orientation and script detection
  'pan', // Punjabi
  'pol', // Polish
  'por', // Portuguese
  'pus', // Pashto
  'que', // Quechua
  'ron', // Romanian
  'rus', // Russian
  'san', // Sanskrit
  'sin', // Sinhala
  'slk', // Slovak
  'slv', // Slovenian
  'spa', // Spanish
  'spa_old', // Old Spanish
  'sqi', // Albanian
  'srp', // Serbian (Latin script)
  'srp_cyrl', // Serbian (Cyrillic script)
  'sun', // Sundanese
  'swa', // Swahili
  'swe', // Swedish
  'syr', // Syriac
  'tam', // Tamil
  'tel', // Telugu
  'tgk', // Tajik
  'tgl', // Tagalog
  'tha', // Thai
  'tir', // Tigrinya
  'tur', // Turkish
  'uig', // Uyghur
  'ukr', // Ukrainian
  'urd', // Urdu
  'uzb', // Uzbek
  'uzb_cyrl', // Uzbek (Cyrillic script)
  'vie', // Vietnamese
  'yid', // Yiddish
  'yor', // Yoruba
];
