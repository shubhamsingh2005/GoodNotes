export interface Note {
  id: string;
  _id?: string;
  title: string;
  subtitle?: string;
  content: string;
  date?: string;
  reminder?: string | null;
  isPinned?: boolean;
  isStarred?: boolean;
  starred?: boolean; // Legacy support
  isTrashed?: boolean;
  shareCode?: string;
  folder?: string;
  color?: string;
  isReminder?: boolean;
  reminderDate?: string;
  tags?: string[];
  user?: string;
  createdAt?: string | number;
  lastModified?: number;
}
