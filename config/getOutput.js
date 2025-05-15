export default function getOutput({ buildPath }) {
  return {
    path: buildPath,
    filename: "js/[name].[contenthash:8].js",
    chunkFilename: 'js/[id].[contenthash:8].js',
    clean: true
  };
};
