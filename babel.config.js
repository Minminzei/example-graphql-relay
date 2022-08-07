module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "relay",
      "macros",
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@database": "./database",
            "@components": "./components",
            "@screens": "./screens",
            "@hooks": "./hooks",
            "@constants": "./constants",
            "@generated": "./generated",
            "@navigation": "./navigation",
            "@api": "./api",
          },
        },
      ],
    ],
  };
};
