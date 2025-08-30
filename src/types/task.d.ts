export interface TaskType {
  title: string;
  note?: string;
  tag?: string[];
  duration?: {
    start: Date;
    end: Date;
  };
}

export interface TagType {
  id: string;
  icon: string;
  title: string;
  slug: string;
  color: string;
}
