export default function postCssLoader(isDev) {
  const plugins = [[
    "postcss-sort-media-queries",
    {
      sort: "desktop-first"
    }
  ]];
  if (!isDev) {
    plugins.push(
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
