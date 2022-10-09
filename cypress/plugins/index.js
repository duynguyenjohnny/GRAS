//For Cucumber Integration
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
import "@bahmutov/cy-api";
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const nodePolyfills =
  require("@esbuild-plugins/node-modules-polyfill").NodeModulesPolyfillPlugin;
//const cucumber = require("cypress-cucumber-preprocessor").default;
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const findWebpack = require("find-webpack");
const webpackPreprocessor = require("@cypress/webpack-batteries-included-preprocessor");
const webpack = require("@cypress/webpack-preprocessor");
const wp = require("@cypress/webpack-preprocessor");

module.exports = (on) => {
  on("file:preprocessor", webpackPreprocessor());
};

module.exports = (on) => {
  const options = {
    webpackOptions: require("../webpack.config.js"),
  };
  on("file:preprocessor", webpack(options));
};

module.exports = async (on, config) => {
  await addCucumberPreprocessorPlugin(on, config); // to allow json to be produced
  // To use esBuild for the bundler when preprocessing
  on("file:preprocessor", webpackPreprocessor());
  module.exports = (on) => {
    on("file:preprocessor", webpackPreprocessor());
  };
  module.exports = (on) => {
    on(
      "file:preprocessor",
      webpackPreprocessor({
        typescript: require.resolve("typescript"),
      })
    );
  };
  on(
    "file:preprocessor",
    createBundler({
      plugins: [nodePolyfills(), createEsbuildPlugin(config)],
    })
  );
  return config;
};

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on) => {
  // find the Webpack config used by react-scripts
  const webpackOptions = findWebpack.getWebpackOptions();

  if (!webpackOptions) {
    throw new Error("Could not find Webpack in this project 😢");
  }

  // if we just pass webpackOptions to the preprocessor
  // it won't work - because react-scripts by default
  // includes plugins that split specs into chunks, etc.
  // https://github.com/cypress-io/cypress-webpack-preprocessor/issues/31

  // solution 1
  // blunt: delete entire optimization object
  // delete webpackOptions.optimization

  // solution 2
  // use a module that carefully removes only plugins
  // that we found to be breaking the bundling
  // https://github.com/bahmutov/find-webpack
  const cleanOptions = {
    reactScripts: true,
  };

  findWebpack.cleanForCypress(cleanOptions, webpackOptions);

  const options = {
    webpackOptions,
    watchOptions: {},
  };

  on("file:preprocessor", webpackPreprocessor(options));
};

module.exports = (on) => {
  const options = {
    webpackOptions: require("../../webpack.config"),
  };

  on("file:preprocessor", wp(options));
};
