import webpack from 'webpack';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

export default function configWebpack() {
  return {
    name: 'docusaurus-plugin-webpack-config',
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          fallback: {
            child_process: false,
            readline: false,
            v8: false,
            perf_hooks: false,
            module: false,
            async_hooks: false,
          },
        },
        plugins: [
          new webpack.ProvidePlugin({
            process: 'process/browser',
          }),
          new webpack.DefinePlugin({
            'process.versions.node': JSON.stringify(process.versions.node || '0.0.0'),
          }),

          new NodePolyfillPlugin(),
        ],
      };
    },
  };
}
