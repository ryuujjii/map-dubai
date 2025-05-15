import sassLoader from './loaders/css/sassLoader.js';
import postCssLoader from './loaders/css/postCssLoader.js';
import cssLoader from './loaders/css/cssLoader.js';
import miniCssExtractPluginLoader from './loaders/css/miniCssExtractPluginLoader.js';
import underscoreTemplateLoader from './loaders/html/underscore-template-loader.js';
import cssStringReplaceLoader from './loaders/css/stringReplaceLoader.js';
import htmlStringReplaceLoader from './loaders/html/stringReplaceLoader.js';
import swcLoader from './loaders/js/swcLoader.js';

export default function getLoaders({ isDev }) {
  return [
    {
      test: /\.js$/,
      exclude: /(node_modules|files)/,
      use: [
        swcLoader()
      ]
    },
    {
      test: /\.(scss|css)$/,
      use: [
        miniCssExtractPluginLoader(),
        cssLoader(),
        postCssLoader(isDev),
        sassLoader(isDev),
        cssStringReplaceLoader(),
      ],
    },
    {
      test: /\.html$/,
      use: [
        underscoreTemplateLoader(),
        htmlStringReplaceLoader()
      ]
    }
  ];
};

