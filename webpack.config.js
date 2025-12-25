// Generates an HTML file and injects the bundled JS automatically
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Module Federation plugin comes from webpack container
// This enables micro-frontend capabilities
const { ModuleFederationPlugin } = require("webpack").container;

// Export webpack configuration
module.exports = {

  // Enables useful dev features like readable errors, no minification
  mode: "development",

  // Entry point of the application
  // Webpack starts building the dependency graph from here
  entry: "./src/index.js",

  // Development server configuration
  devServer: {
    // Host app runs on port 3000
    port: 3000,
  },

  // Output configuration
  output: {
    // "auto" lets webpack decide public path at runtime
    // REQUIRED for Module Federation so chunks load correctly
    publicPath: "auto",
  },

  // Allows importing files without specifying extensions
  // Example: import App from "./App"
  resolve: {
    extensions: [".js", ".jsx"],
  },

  // Module rules define how different files are handled
  module: {
    rules: [
      {
        // Apply this rule to .js and .jsx files
        test: /\.(js|jsx)$/,

        // CRITICAL for Module Federation
        // Prevents webpack from treating remote imports incorrectly
        type: "javascript/auto",

        // Skip transpiling dependencies
        exclude: /node_modules/,

        // Use Babel to transpile modern JS & JSX
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              // Converts modern JS to browser-compatible JS
              // modules:false is REQUIRED so webpack can handle imports
              ["@babel/preset-env", { modules: false }],

              // Enables JSX transformation
              "@babel/preset-react",
            ],
          },
        },
      },
    ],
  },

  // Plugins extend webpack capabilities
  plugins: [

    // Module Federation configuration
    new ModuleFederationPlugin({

      // Name of this container (used internally by webpack)
      name: "host",

      // Declare remote applications this app can import from
      remotes: {
        // Allows: import("remoteButton/Button")
        remoteButton: "remoteButton@http://localhost:3001/remoteEntry.js",

        // Allows: import("remoteCard/Card")
        remoteCard: "remoteCard@http://localhost:3002/remoteEntry.js",
      },

      // Shared dependencies across host & remotes
      shared: {
        // Use a single instance of React across all apps
        // Prevents hooks & context crashes
        react: { singleton: true },

        // Same for react-dom
        "react-dom": { singleton: true },
      },
    }),

    // Generates index.html and injects scripts automatically
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
