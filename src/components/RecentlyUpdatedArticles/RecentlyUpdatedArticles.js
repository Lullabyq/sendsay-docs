import React from 'react';
import Layout from '@theme/Layout';
import { CustomLastUpdate } from '../CustomLastUpdate';
import { CustomLastUpdateType } from '../CustomLastUpdate/CustomLastUpdate';
import { RECENT_ARTICLES_CONTENT_ID } from './constants.js';
import { truncateString } from './utils/truncateString';

const NBSP = '\u00A0';

const RecentlyUpdatedArticlesCard = ({ children, slug, index }) => {
  const handleClick = () => {
    // eslint-disable-next-line no-undef
    document.dispatchEvent(new CustomEvent('redirect', { detail: { slug } }));
  };

  return (
    <div
      className="card group p-4 rounded-xl border-solid border border-gray-300 gap-3 flex flex-col hover:cursor-pointer"
      onClick={handleClick}
      tabIndex={index}
      role="link"
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
      {recentArticles.map(({ title, lastUpdatedAt, frontMatter, slug, description }, index) => (
        <RecentlyUpdatedArticlesCard key={slug} slug={slug} index={index}>
          <div className="flex flex-col gap-2">
            <h5 className="text-gray-800 text-base font-medium m-0 group-hover:text-blue-600">
              {title}
            </h5>

            <CustomLastUpdate
              lastUpdatedAt={lastUpdatedAt}
              type={
                frontMatter.recent_article?.new
                  ? CustomLastUpdateType.CreationDate
                  : CustomLastUpdateType.UpdateDate
              }
            />
          </div>

          <RecentlyUpdatedArticlesChanges frontMatter={frontMatter} />

          {description && frontMatter.recent_article?.new && (
            <span className="text-gray-800 text-xs">{truncateString(description, 200)}</span>
          )}
        </RecentlyUpdatedArticlesCard>
      ))}
    </div>
  </Layout>
);

export default RecentlyUpdatedArticles;
