import { StyleSheet } from 'react-native';
import { theme } from 'src/styles/theme';
import {
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from 'src/utils/dimension';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
    paddingHorizontal: pixelSizeHorizontal(16),
    paddingVertical: pixelSizeVertical(20),
    flexDirection: 'row',
    shadowColor: theme.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: pixelSizeVertical(12),
  },
  image: {
    width: pixelSizeHorizontal(100),
    height: pixelSizeVertical(150),
  },
  title: {
    fontWeight: 'bold',
    fontSize: fontPixel(20),
    marginBottom: pixelSizeVertical(8),
  },
  description: {
    color: theme.grey,
  },
  textContainer: {
    flexShrink: 1,
    marginLeft: pixelSizeHorizontal(8),
  },
  detailButton: {
    position: 'absolute',
    right: pixelSizeHorizontal(12),
    bottom: pixelSizeVertical(20),
  },
  detailButtonText: {
    fontSize: fontPixel(16),
    color: theme.primary,
  },
});
