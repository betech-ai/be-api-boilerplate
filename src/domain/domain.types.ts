export type ListOptions<T> = {
  skip?: number;
  limit?: number;
  sort?: Array<{
    [Property in keyof T]?: SortDirection;
  }>;
  filter?: Partial<T>;
};

export type ListResult<T> = {
  total: number;
  items: T[];
};

type SortDirection = 'asc' | 'desc';
