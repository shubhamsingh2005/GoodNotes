export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  lastModified: number;
  folder: string;
  tags: string[];
  starred: boolean;
}
