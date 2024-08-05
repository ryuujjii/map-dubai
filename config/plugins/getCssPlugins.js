import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default function getCssPlugins() {
  return new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css',
    chunkFilename: "css/[id].[contenthash:8].css",
  });
};
