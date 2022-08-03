import { StyleSheet } from 'react-native';
import { pixelSizeHorizontal, pixelSizeVertical } from 'src/utils/dimension';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: pixelSizeHorizontal(8),
    paddingVertical: pixelSizeVertical(8),
  },
  flex1: {
    flex: 1,
  },
});
