import HtmlWebpackPlugin from 'html-webpack-plugin';
import fs from 'fs';
import { resolve, basename } from 'path';

export default function getHtmlPlugins({ paths }) {
  // const htmlPages = fs.readdirSync(paths.src).filter((el) => el.endsWith('.html'));

  return [
    // ...htmlPages.map((page) => {
    //   const pageName = basename(page, '.html');
    //   return new HtmlWebpackPlugin({
    //     filename: pageName === 'index' ? page : `${pageName}/index.html`,
    //     chunks: [pageName],
    //     chunksSortMode: 'manual',
    //     template: resolve(paths.src, page),
    //     minify: true
    //   });
    // }),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      chunks: ['index'],
      chunksSortMode: 'manual',
      template: resolve(paths.src, 'index.html'),
      minify: true
    }),
    new HtmlWebpackPlugin({
      filename: `key-mavens/index.html`,
      chunks: ['projects'],
      chunksSortMode: 'manual',
      template: resolve(paths.src, 'projects/key-mavens.html'),
      minify: true
    }),
    new HtmlWebpackPlugin({
      filename: `modal360/index.html`,
      chunks: ['modal360'],
      chunksSortMode: 'manual',
      template: resolve(paths.src, 'modal360/index.html'),
      minify: true
    }),
    new HtmlWebpackPlugin({
      filename: `modal360/index-popup.html`,
      chunks: ['indexPopup'],
      chunksSortMode: 'manual',
      template: resolve(paths.src, 'modal360/index-popup.html'),
      minify: true
    })
  ];
};
