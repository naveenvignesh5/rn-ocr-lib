export enum PageSetMode {
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

export enum DataInputType {
  file = 'FILE',
  base64 = 'BASE64',
}

export interface OCROptions {
  pageSetMode: PageSetMode;
}
