import webpack from "webpack";

export default function definePlugin({ env }) {
  return new webpack.DefinePlugin({
    __ISDEVELOPMENT__: JSON.stringify(env.mode === "development"),
    __SHOWPANO__: JSON.stringify(env.showPano === "true"),
  });
};
