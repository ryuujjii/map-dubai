export default function htmlStringReplaceLoader() {
  return {
    loader: 'string-replace-loader',
    options: {
      multiple: [
        {
          search: '@img',
          replace: 'img',
          flags: 'g'
        },
        {
          search: '@files',
          replace: '../../files',
          flags: 'g'
        }
      ]
    }
  };
};
