import React from 'react';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const NARROW_SPACE = '\u202F';

export const CustomLastUpdate = ({ lastUpdatedAt }: { lastUpdatedAt: number }): JSX.Element => {
  const { i18n } = useDocusaurusContext();

  return (
    <div className="rounded-sm bg-blue-50 px-1.5 py-0.5 text-blue-500 text-xs font-normal w-fit mb-3">
      <span>
        {translate({ id: 'theme.lastUpdated.atDate', message: 'Обновлено:' })}

        <time dateTime={new Date(lastUpdatedAt * 1000).toISOString()}>
          {new Intl.DateTimeFormat(i18n.currentLocale, {
            day: 'numeric',
            month: 'long',
            timeZone: 'UTC',
          }).format(lastUpdatedAt)}

          {NARROW_SPACE}

          {new Intl.DateTimeFormat(i18n.currentLocale, {
            year: 'numeric',
          }).format(lastUpdatedAt)}
        </time>
      </span>
    </div>
  );
};
