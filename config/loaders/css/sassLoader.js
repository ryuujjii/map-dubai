export default function sassLoader(isDev) {
  return {
    loader: "sass-loader",
    options: {
      sourceMap: false,
      sassOptions: {
        outputStyle: isDev ? "expanded" : "compressed",
      },
    }
  };
};
