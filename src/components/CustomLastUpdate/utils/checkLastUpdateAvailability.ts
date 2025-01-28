import { CustomFrontMatter } from '../../../types';
import { isSidebarFolder } from '../../../utils/isSidebarFolder';

export const checkLastUpdateAvailability = (id: string, frontMatter: CustomFrontMatter) =>
  !frontMatter.recent_article?.ignore && !isSidebarFolder(id);
