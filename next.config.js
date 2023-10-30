/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf");

module.exports = {
  webpack(config, options) {
    Object.assign(config.experiments, { topLevelAwait: true });
    if (!options.isServer) {
      // config.cache = false;

      config.plugins.push(
        new NextFederationPlugin({
          name: "notify",
          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./component/Notify": "./src/pages/index.tsx",
          },

          shared: {
         
          
          },
        })
      );
    }

    return config;
  },
};
