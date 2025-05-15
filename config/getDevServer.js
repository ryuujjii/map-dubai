export default function getDevServer({ buildPath }) {
  return {
    static: buildPath,
    port: "auto",
    compress: true,
    // при запуске чтобы он создавал файлы в корне проекта
    devMiddleware: {
      writeToDisk: true,
    },
    // open: true,
    // open: ['/about', '/home'],
    // host: 'local-ip',
    // server: "https",
    // * вместо 404 ошибки ведет на index.html
    // historyApiFallback: true,
    watchFiles: ['src/*'],
  };
};
