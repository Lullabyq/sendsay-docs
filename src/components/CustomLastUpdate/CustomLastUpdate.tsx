import React from 'react';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';

const NBSP = '\u00A0';

export const enum CustomLastUpdateType {
  Tag = 'tag',
  UpdateDate = 'updateDate',
  CreationDate = 'creationDate',
}

interface CustomLastUpdateProps {
  lastUpdatedAt: number;
  type: CustomLastUpdateType;
  frontMatter: {
    recent_article?: {
      ignore: boolean;
    };
  };
}

const UpdateMark = (): JSX.Element => <div className="w-2 h-2 bg-blue-600 rounded-full" />;
const NewMark = (): JSX.Element => <div className="w-2 h-2 bg-green-600 rounded-full" />;

export const CustomLastUpdate = ({
  lastUpdatedAt,
  frontMatter = {},
  type = CustomLastUpdateType.Tag,
}: CustomLastUpdateProps): JSX.Element => {
  const { i18n } = useDocusaurusContext();

  const isRuLocale = i18n.currentLocale === 'ru';

  if (frontMatter.recent_article && frontMatter.recent_article.ignore) {
    return null;
  }

  return (
    <div
      className={clsx('rounded-sm px-1.5 py-0.5 text-xs font-normal w-fit', {
        'text-blue-500 bg-blue-50 mb-3': type === CustomLastUpdateType.Tag,
        'text-gray-800 italic':
          type === CustomLastUpdateType.UpdateDate || type === CustomLastUpdateType.CreationDate,
      })}
    >
      <div className="flex flex-row">
        <div className="flex gap-1.5 items-center">
          {type === CustomLastUpdateType.UpdateDate && <UpdateMark />}
          {type === CustomLastUpdateType.CreationDate && <NewMark />}

          {type === CustomLastUpdateType.CreationDate
            ? translate({ id: 'lastUpdated.createDate', message: 'Опубликовано:' })
            : translate({ id: 'lastUpdated.atDate', message: 'Обновлено:' })}
          {NBSP}
        </div>

        <time dateTime={new Date(lastUpdatedAt).toISOString()}>
          {new Intl.DateTimeFormat(i18n.currentLocale, {
            day: 'numeric',
            month: 'long',
            year: isRuLocale ? undefined : 'numeric',
            timeZone: 'UTC',
          }).format(lastUpdatedAt)}

          {NBSP}

          {isRuLocale &&
            new Intl.DateTimeFormat('ru', {
              year: 'numeric',
            }).format(lastUpdatedAt)}
        </time>
      </div>
    </div>
  );
};
