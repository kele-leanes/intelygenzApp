import { StyleSheet } from 'react-native';
import { pixelSizeHorizontal, pixelSizeVertical } from 'src/utils/dimension';

export const styles = StyleSheet.create({
  image: {
    width: pixelSizeHorizontal(300),
    height: pixelSizeVertical(450),
  },
  flex1: {
    flex: 1,
  },
  alignCenter: {
    alignItems: 'center',
  },
});
