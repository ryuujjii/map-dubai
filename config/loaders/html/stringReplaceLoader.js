export default function htmlStringReplaceLoader() {
  return {
    loader: 'string-replace-loader',
    options: {
      search: '@img',
      replace: 'img',
      flags: 'g'
    }
  };
};
