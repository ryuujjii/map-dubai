import { resolve } from 'path';
import getConfig from './config/getConfig.js';


export default function config(env) {
  const __dirname = import.meta.dirname;
  console.log('path: ', __dirname);

  const paths = {
    src: resolve(__dirname, 'src'),
    build: resolve(__dirname, 'build')
  };

  const config = getConfig({
    paths,
    env
  });

  return config;
};