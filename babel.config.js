module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@screens": "./src/screens",
            "@components": "./src/components",
            "@utils": "./src/utils",
            "@config/*": "./src/config/*",
            "@contexts/*": "./src/contexts/*",
            "@assets/*": "./assets/*",
          },
        },
      ],
    ],
  };
};
