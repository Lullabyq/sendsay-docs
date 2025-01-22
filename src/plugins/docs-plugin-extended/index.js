const docsPluginExports = require('@docusaurus/plugin-content-docs');
const { getRecentlyUpdatedArticles } = require('./getRecentArticles');
const { RECENT_ARTICLES_TEMP_URL } = require('../../components/RecentlyUpdatedArticles/constants');

const defaultDocsPlugin = docsPluginExports.default;

const docsPluginEnhanced = async (...pluginArgs) => {
  const docsPluginInstance = await defaultDocsPlugin(...pluginArgs);

  return {
    ...docsPluginInstance,

    async contentLoaded(params) {
      const { content, actions } = params;
      const { docs } = content.loadedVersions[0];

      const recentlyUpdatedArticles = getRecentlyUpdatedArticles(docs);

      const recentArticles = await actions.createData(
        'recentlyUpdatedArticles.json',
        JSON.stringify(recentlyUpdatedArticles)
      );

      actions.addRoute({
        path: RECENT_ARTICLES_TEMP_URL,
        exact: true,
        component: '@site/src/components/RecentlyUpdatedArticles/RecentlyUpdatedArticles.js',
        modules: {
          recentArticles,
        },
      });

      return docsPluginInstance.contentLoaded(params);
    },
  };
};

module.exports = {
  ...docsPluginExports,
  default: docsPluginEnhanced,
};
