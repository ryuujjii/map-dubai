export default function postCssLoader(isDev) {
  const plugins = [];
  if (!isDev) {
    plugins.push(
      [
        "postcss-sort-media-queries",
        {
          sort: "desktop-first"
        }
      ],
      [
        "postcss-preset-env",
        {
          env: 'production'
        }
      ]
    );
  } else {
    plugins.push(
      [
        "postcss-preset-env",
        {
          env: 'development'
        }
      ],
    );
  }
  return {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins
      },
    },
  };
};
