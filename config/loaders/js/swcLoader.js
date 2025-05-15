export default function swcLoader() {
  return {
    loader: 'swc-loader',
    options: {
      "jsc": {
        "target": "es5",
      }
    }
  };
};
