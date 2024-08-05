import getHtmlPlugins from './plugins/getHtmlPlugins.js';
import getCssPlugins from './plugins/getCssPlugins.js';
import copyPlugin from './plugins/copyPlugin.js';
import definePlugin from './plugins/definePlugin.js';
import macros from './plugins/macros.js';

export default function getPlugins({ paths, env }) {

  return [
    ...getHtmlPlugins({ paths }),
    getCssPlugins({ paths }),
    copyPlugin({ paths }),
    definePlugin({ env }),
    macros({ env })
  ];
};
