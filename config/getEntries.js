import fs from 'fs';
import { resolve, basename } from 'path';

export default function getEntries({ paths }) {
  const jsPath = resolve(paths.src, 'js');
  const jsPerPage = fs.readdirSync(jsPath).filter((el) => el.endsWith('.js'));
  const entries = jsPerPage.reduce((acc, js) => {
    const filename = basename(js, '.js');
    acc[filename] = resolve(jsPath, js);
    return acc;
  }, {});

  entries.projects = resolve(paths.src, 'js/projects/index.js');
  entries.modal360 = resolve(paths.src, 'js/modal360/index.js');
  return entries;
}