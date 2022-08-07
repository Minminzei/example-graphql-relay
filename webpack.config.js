const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.resolve.alias[
    "react-native-material-ripple"
  ] = `${__dirname}/components/atoms/RippleForWeb`;

  config.resolve.alias["react-native-error-boundary"] = "react-error-boundary";
  return config;
};
