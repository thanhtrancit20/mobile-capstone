import { loadAsync } from 'expo-font';

export const fonts = {
  openSan: {
    regular: 'openSans_regular',
    regularItalic: 'openSans_regular_italic',
    semiBold: 'openSans_semiBold',
    semiBoldItalic: 'openSans_semiBold_italic',
    bold: 'openSans_bold',
    boldItalic: 'openSans_bold_italic',
  },
};

// preload fonts
export const loadFonts = () =>
  loadAsync({
    openSans_regular: require('@/src/assets/fonts/OpenSans-Regular.ttf'),
    openSans_regular_italic: require('@/src/assets/fonts/OpenSans-Italic.ttf'),
    openSans_semiBold: require('@/src/assets/fonts/OpenSans-Semibold.ttf'),
    openSans_semiBold_italic: require('@/src/assets/fonts/OpenSans-SemiboldItalic.ttf'),
    openSans_bold: require('@/src/assets/fonts/OpenSans-Bold.ttf'),
    openSans_bold_italic: require('@/src/assets/fonts/OpenSans-BoldItalic.ttf'),
  });
