module.exports = function (api) {
  api.cache(true);
  api.cache(true);
  return {
    presets: [["babel-preset-expo", {
      jsxImportSource: "nativewind"
    }], "nativewind/babel"],
    plugins: [
      [
        'module-resolver',
        {
          // alias: {
          //   '@': './src',
          // },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
      ['react-native-worklets-core/plugin'],
    ],
  };
};
