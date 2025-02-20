import { Asset } from 'expo-asset';

export const images: { [key: string]: ReturnType<typeof require> } = {
  logo: require('@/src/assets/images/logo-sm.png'),
  logo_sm: require('@/src/assets/images/logo-sm.png'),
  logo_lg: require('@/src/assets/images/logo-lg.png'),
};

// preload images
const preloadImages = () =>
  Object.keys(images).map(key => {
    return Asset.fromModule(images[key] as number).downloadAsync();
  });

export const loadImages = async () => Promise.all(preloadImages());
