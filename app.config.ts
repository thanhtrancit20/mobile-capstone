import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const envConfig: ExpoConfig = {
    ...config,
    scheme: "myapp",
    slug: process.env.EXPO_PUBLIC_SLUG ?? '',
    name: process.env.EXPO_PUBLIC_NAME ?? '',
    ios: {
      ...config.ios,
      bundleIdentifier: process.env.EXPO_PUBLIC_IOS_BUNDLE_IDENTIFIER,
      buildNumber: '1',
    },
    android: {
      ...config.android,
      package: 'com.yourappname', // Đặt tên package của bạn
      versionCode: 1,
      permissions: [
        "CAMERA",
        "CAMERA_ROLL"
      ],
      adaptiveIcon: {
        foregroundImage: "src/assets/images/logo-sm.png",
        backgroundColor: "#ffffff"
      },
    },
    updates: {
      url: `https://u.expo.dev/${process.env.EXPO_PUBLIC_PROJECT_ID}`,
    },
    extra: {
      ...config.extra,
      eas: { projectId: process.env.EXPO_PUBLIC_PROJECT_ID },
      ENV: process.env.EXPO_PUBLIC_ENV,
      API_URL: process.env.EXPO_PUBLIC_API_URL,
    },
    plugins: [
      "react-native-vision-camera",
      "expo-asset",
      "expo-font",
      "react-native-face-detector-camera",
      [
        "react-native-face-detector-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera"
        }
      ]
    ],
    runtimeVersion: "1.0.0",
  };
  return envConfig;
};
