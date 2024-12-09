import React from 'react';
import Translate from '@docusaurus/Translate';

const NARROW_SPACE = '\u202F';

export const CustomLastUpdate = ({ lastUpdatedAt }: { lastUpdatedAt: number }): JSX.Element => (
  <div className="rounded-sm bg-blue-50 px-1.5 py-0.5 text-blue-500 text-xs font-normal w-fit mb-3">
    <Translate
      id="theme.lastUpdated.atDate"
      values={{
        date: (
          <time dateTime={new Date(lastUpdatedAt * 1000).toISOString()}>
            {new Intl.DateTimeFormat('ru', {
              day: 'numeric',
              month: 'long',
              timeZone: 'UTC',
            }).format(lastUpdatedAt)}
            {NARROW_SPACE}
            {new Intl.DateTimeFormat('ru', {
              year: 'numeric',
            }).format(lastUpdatedAt)}
          </time>
        ),
      }}
    >
      {'Обновлено: {date}'}
    </Translate>
  </div>
);
