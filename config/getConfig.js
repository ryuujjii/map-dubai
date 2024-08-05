import getOutput from './getOutput.js';
import getDevServer from './getDevServer.js';
import getPlugins from './getPlugins.js';
import getResolvers from './getResolvers.js';
import getLogs from './getLogs.js';
import getOptimization from './getOptimization.js';
import getLoaders from './getLoaders.js';
import getEntries from './getEntries.js';


export default function getConfig(options) {
  const { env, paths } = options;
  const isDev = env.mode === 'development';
  return {
    mode: env.mode ?? 'development',
    entry: getEntries({ paths }),
    output: getOutput({ buildPath: paths.build }),
    plugins: getPlugins({ paths, env }),
    //* для проверки prod = source-map
    devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
    devServer: isDev ? getDevServer({ buildPath: paths.build }) : undefined,
    module: {
      rules: getLoaders({ isDev }),
    },
    resolve: getResolvers({ srcPath: paths.src }),
    optimization: !isDev ? getOptimization() : undefined,
    stats: getLogs(),
  };
};
