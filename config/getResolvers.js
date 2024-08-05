import { resolve } from 'path';

export default function getResolvers({ srcPath }) {
  return {
    extensions: ['.js'],
    alias: {
      '@': resolve(srcPath, 'js'),
      utils$: resolve(srcPath, 'js/components/utils.js'),
    },
  };
};
