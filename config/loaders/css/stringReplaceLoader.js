export default function cssStringReplaceLoader() {
  return {
    loader: 'string-replace-loader',
    options: {
      multiple: [
        {
          search: '@img',
          replace: '/img',
          flags: 'g'
        },
        {
          search: '@scss',
          replace: '/src/scss',
          flags: 'g'
        }
      ]
    }
  };
};
