module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src', // ← now "@/features/.." → "<projectRoot>/src/features/.."
        },
      },
    ],
  ],
};
