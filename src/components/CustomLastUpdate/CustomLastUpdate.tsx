import React from 'react';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const NBSP = '\u00A0';

export const CustomLastUpdate = ({ lastUpdatedAt }: { lastUpdatedAt: number }): JSX.Element => {
  const { i18n } = useDocusaurusContext();

  const isRuLocale = i18n.currentLocale === 'ru';
  const formattedUpdatedAt = lastUpdatedAt * 1000;

  return (
    <div className="rounded-sm bg-blue-50 px-1.5 py-0.5 text-blue-500 text-xs font-normal w-fit mb-3">
      <span>
        {translate({ id: 'lastUpdated.atDate', message: 'Обновлено: ' })}

        <time dateTime={new Date(formattedUpdatedAt).toISOString()}>
          {new Intl.DateTimeFormat(i18n.currentLocale, {
            day: 'numeric',
            month: 'long',
            year: isRuLocale ? undefined : 'numeric',
            timeZone: 'UTC',
          }).format(formattedUpdatedAt)}

          {NBSP}

          {isRuLocale &&
            new Intl.DateTimeFormat('ru', {
              year: 'numeric',
            }).format(formattedUpdatedAt)}
        </time>
      </span>
    </div>
  );
};
