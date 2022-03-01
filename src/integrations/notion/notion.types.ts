import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints';

type PropType<T, P extends keyof T> = T[P];

export type NotionTableColumn = PropType<CreatePageParameters, 'properties'>;

type QueryNotionResult<T> = {
  id: string;
  object: 'page';
  properties: T;
};

export type QueryNotionResponse<T> = {
  object: 'list';
  next_cursor: null;
  has_more: boolean;
  results: QueryNotionResult<T>[];
};

type TableTypeValues = 'multi_select' | 'people' | 'title' | 'number' | 'date';

type ReturnAsProperty = Exclude<TableTypeValues, 'number' | 'date'>;

type TableTypeTitle = {
  type: 'title';
  text: { content: string; link: null };
  plain_text: string;
  href: null;
};

export type TagColor =
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red';

export type TableTypeMultSelectItem = {
  id?: string;
  name: string;
  color?: TagColor;
};

type TableTypeMultSelect = {
  id: string;
  type: 'multi_select';
  multi_select: TableTypeMultSelectItem[];
};

type TableTypeNumber = {
  id: string;
  type: 'number';
  number: number;
};

type TableTypeDate = {
  id: string;
  type: 'date';
  date: {
    start: string;
    end: null;
    time_zone: null;
  } | null;
};

type TableTypesTuple = [
  TableTypeTitle,
  TableTypeMultSelect,
  TableTypeNumber,
  TableTypeDate
];

type TableTypesLimitTuple = [never, 0, 1, 2, 3];

type ReturnTableType<Type, Cursor extends number = 4> = [Cursor] extends [never]
  ? never
  : TableTypesTuple[Cursor] extends { type: Type }
  ? TableTypesTuple[Cursor]
  : ReturnTableType<Type, TableTypesLimitTuple[Cursor]>;

export type TableType<T extends TableTypeValues> = T extends ReturnAsProperty
  ? Record<T, ReturnTableType<T>> & {
      id: string;
      type: T;
    }
  : ReturnTableType<T> & {
      id: string;
      type: T;
    };

export type StoryTableType = {
  ID: TableType<'number'>;
  Tarefa: TableType<'title'>;
  Labels: TableType<'multi_select'>;
  Status: TableType<'multi_select'>;
  Type: TableType<'multi_select'>;
  Completed: TableType<'date'>;
};
