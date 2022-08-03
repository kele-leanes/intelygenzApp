import { Dimensions } from 'react-native';
import { PixelRatio } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

const widthBaseScale = SCREEN_WIDTH / 414;
const heightBaseScale = SCREEN_HEIGHT / 896;

export const normalize = (size: number, based = 'width') => {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const widthPixel = (size: number) => {
  return normalize(size, 'width');
};

const heightPixel = (size: number) => {
  return normalize(size, 'height');
};

export const fontPixel = (size: number) => {
  return heightPixel(size);
};

export const pixelSizeVertical = (size: number) => {
  return heightPixel(size);
};

export const pixelSizeHorizontal = (size: number) => {
  return widthPixel(size);
};
