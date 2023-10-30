/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf");


module.exports = {
  webpack(configOriginal, options) {
    const config = { ...configOriginal }

    Object.assign(config.experiments, { topLevelAwait: true });
    config.module.rules.push(
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      })

    if (!options.isServer) {

      config.plugins.push(
        new NextFederationPlugin({
          name: "notify",
          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./component/Notify": "./src/pages/index.tsx",
          },
          shared: {},
        })
      );
    }

    return config;
  },
};
