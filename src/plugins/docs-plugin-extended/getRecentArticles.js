const RECENT_ARTICLES_LIMIT = 5;

export const getRecentlyUpdatedArticles = (docs) =>
  docs
    .filter(
      ({ unlisted, draft, frontMatter }) =>
        !unlisted && !draft && !frontMatter?.recent_article?.ignore
    )
    .sort((docA, docB) => docB.lastUpdatedAt - docA.lastUpdatedAt)
    .slice(0, RECENT_ARTICLES_LIMIT);
