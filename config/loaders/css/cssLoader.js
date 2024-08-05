export default function cssLoader() {
  return {
    loader: "css-loader",
    options: {
      url: false,
      sourceMap: false,
      modules: false,
      importLoaders: 2
    }
  };
};
