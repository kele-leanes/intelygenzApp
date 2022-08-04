import { StyleSheet } from 'react-native';
import { theme } from 'src/styles/theme';
import {
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from 'src/utils/dimension';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: pixelSizeHorizontal(8),
    paddingVertical: pixelSizeVertical(8),
  },
  flex1: {
    flex: 1,
  },
  boldText: {
    fontSize: fontPixel(20),
    fontWeight: '700',
    color: theme.black,
  },
  errorText: {
    color: theme.warning,
  },
  text: {
    fontSize: fontPixel(12),
    color: theme.grey,
  },
  center: {
    alignItems: 'center',
  },
});
