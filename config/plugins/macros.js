import webpack from 'webpack';
export default function macros({ env }) {
  const enableServerSideMacros = env.macros === 'server';
  const serverSideMacros = [
    {
      key: 'phpLogin',
      fn: (params) => {
        const txt = `
        <?php
          session_start();
            if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
              $currentUrl = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
              header("Location: ./login/?redirect=" . urlencode($currentUrl));
              exit();
            }
            ?>
        `;
        return JSON.stringify(txt);
      },
      fallbackFn: (params) => {
        const txt = '';
        return JSON.stringify(txt);
      }
    }
  ];
  const allMacros = {
    ...getFilteredMacros(serverSideMacros, enableServerSideMacros),
    copyRight: (params) => {
      const txt = `${new Date().getFullYear()} All rights reserved`;
      return JSON.stringify(txt);
    },
  };

  return new webpack.LoaderOptionsPlugin({
    options: {
      macros: allMacros,
    },
  });
};

function getFilteredMacros(macros, query) {
  return macros.reduce((acc, el) => {
    acc[el.key] = query ? el.fn : el.fallbackFn;
    return acc;
  }, {});
}