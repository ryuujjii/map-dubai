import CopyPlugin from "copy-webpack-plugin";

export default function copyPlugin({ paths }) {
  return new CopyPlugin({
    patterns: [
      {
        from: `${paths.src}/img`,
        to: `img`,
        noErrorOnMissing: true,
        force: true,
      },
      {
        from: `${paths.src}/files`,
        to: `files`,
        noErrorOnMissing: true,
        force: true,
      },
      {
        from: `${paths.src}/pano`,
        to: `files/pano`,
        noErrorOnMissing: true,
        force: true,
      }
    ],
  });
};

