import { CustomFrontMatter } from '../../../types';
import { isSidebarFolder } from '../../../utils/isSidebarFolder';

export const checkFeedbackAvailability = (id: string, frontMatter: CustomFrontMatter) =>
  !isSidebarFolder(id) && !frontMatter.feedback_ignore;
