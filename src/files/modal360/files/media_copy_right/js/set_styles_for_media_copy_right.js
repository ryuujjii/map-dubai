
import { mediaCopyRightFonts } from './media_copy_right_fonts.js';
import { appendCopyRightStylesForMedia } from './append_copy_right_styles_for_media.js';
import { FONT_URL } from './settings.js';
export function setStylesForMediaCopyRight() {
  const STYLES_URL = './files/media_copy_right/styles/';
  mediaCopyRightFonts(FONT_URL);
  appendCopyRightStylesForMedia(STYLES_URL);
};

