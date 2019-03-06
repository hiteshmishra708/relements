export { ENDPOINTS } from './endpoints';
export { KEY_CODES } from './key_codes';

export const SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  BIG: 'big',
};

export const BUTTON_TYPES = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
  GREY: 'grey',
  WARNING: 'warning',
  YELLOW: 'yellow',
};

BUTTON_TYPES.ALL = [
  BUTTON_TYPES.DEFAULT,
  BUTTON_TYPES.PRIMARY,
  BUTTON_TYPES.SECONDARY,
  BUTTON_TYPES.OUTLINE,
  BUTTON_TYPES.GREY,
  BUTTON_TYPES.WARNING,
  BUTTON_TYPES.YELLOW,
];
SIZES.ALL = [SIZES.SMALL, SIZES.MEDIUM, SIZES.LARGE];

export const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg'];
