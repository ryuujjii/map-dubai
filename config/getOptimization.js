import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

export default function getOptimization() {
  return {
    // minimize: true, // minimize on dev
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
        exclude: /\/(files|pano)/,
      }),
    ],
  };
};
