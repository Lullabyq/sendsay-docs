import React from 'react';
import Layout from '@theme/Layout';
import { CustomLastUpdate } from '../CustomLastUpdate';
import { CustomLastUpdateType } from '../CustomLastUpdate/CustomLastUpdate';
import { RECENT_ARTICLES_CONTENT_ID } from './constants.js';

const NBSP = '\u00A0';

const ArticleStatus = {
  New: 'new',
  Updated: 'updated',
};

const RecentlyUpdatedArticlesCard = ({ children, slug }) => {
  const handleClick = () => {
    document.dispatchEvent(new CustomEvent('redirect', { detail: { slug } }));
  };

  return (
    <div
      className="card group p-4 rounded-xl border-solid border border-gray-300 gap-3 flex flex-col hover:cursor-pointer"
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

const RecentlyUpdatedArticlesChanges = ({ frontMatter }) => {
  const theses = frontMatter?.recent_article?.theses;

  if (!theses) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {theses.map((item, index) => (
        <span className="text-gray-800 text-xs" key={index}>
          —{NBSP}
          {item}
          {index === theses.length - 1 ? '.' : ';'}
        </span>
      ))}
    </div>
  );
};

const RecentlyUpdatedArticles = ({ recentArticles }) => (
  <Layout>
    <div className="flex flex-col gap-4" id={RECENT_ARTICLES_CONTENT_ID}>
      {recentArticles.map(({ title, lastUpdatedAt, frontMatter, slug }) => (
        <RecentlyUpdatedArticlesCard key={slug} slug={slug}>
          <div className="flex flex-col gap-2">
            <h5 className="text-gray-800 text-base font-medium m-0 group-hover:text-blue-600">
              {title}
            </h5>

            <CustomLastUpdate
              lastUpdatedAt={lastUpdatedAt}
              type={
                frontMatter.recent_article?.status === ArticleStatus.New
                  ? CustomLastUpdateType.CreationDate
                  : CustomLastUpdateType.UpdateDate
              }
            />
          </div>

          <RecentlyUpdatedArticlesChanges frontMatter={frontMatter} />
        </RecentlyUpdatedArticlesCard>
      ))}
    </div>
  </Layout>
);

export default RecentlyUpdatedArticles;
