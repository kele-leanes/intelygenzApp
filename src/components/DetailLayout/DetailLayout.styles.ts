import { StyleSheet } from 'react-native';
import { theme } from 'src/styles/theme';
import {
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from 'src/utils/dimension';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    flex: 1,
    alignItems: 'center',
    paddingVertical: pixelSizeVertical(20),
    paddingHorizontal: pixelSizeHorizontal(16),
  },
  image: {
    width: pixelSizeHorizontal(300),
    height: pixelSizeVertical(450),
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: fontPixel(24),
    marginVertical: pixelSizeVertical(8),
  },
  description: {
    color: theme.grey,
  },
  section: {
    width: '100%',
    marginTop: pixelSizeVertical(16),
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: fontPixel(20),
    marginBottom: pixelSizeVertical(4),
  },
  link: {
    color: theme.primary,
    textDecorationLine: 'underline',
    fontSize: fontPixel(16),
    marginBottom: pixelSizeVertical(8),
  },
});
