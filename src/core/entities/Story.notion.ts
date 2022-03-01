import {
  NotionTableColumn,
  StoryTableType,
  TableTypeMultSelectItem,
} from '~/src/integrations/notion/notion.types';
import StoryShortcut from './Story.shortcut';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

type ColumnIDParams = {
  number: number;
};

type ColumnTaskParams = {
  content: string;
};

type ColumnMultiSelectParams = {
  multi_select?: TableTypeMultSelectItem[];
};

type ColumnURLParams = {
  url: string;
};

type ColumnCompletedParams = {
  start: string | Date | null;
};

class StoryNotion {
  private story: StoryShortcut | undefined;
  private storyTable: StoryTableType | undefined;

  constructor(story: StoryShortcut, storyTable: StoryTableType | undefined) {
    this.story = story;
    this.storyTable = storyTable;
  }

  public toProperties = () => {
    const story = this.story?.getStory();

    if (!story) return undefined;

    const dateFromNotion = this.storyTable?.Completed?.date?.start
      ? utcToZonedTime(
          this.storyTable.Completed.date.start,
          'America/Sao_Paulo'
        )
      : null;

    const dateFromShortcut = story.completedAt
      ? utcToZonedTime(story.completedAt, 'America/Sao_Paulo')
      : null;

    const start =
      dateFromNotion && dateFromShortcut && dateFromShortcut > dateFromNotion
        ? dateFromNotion
        : dateFromShortcut;

    return {
      ...this.storyColumnID({ number: story.id! }),
      ...this.storyColumnTask({ content: story.name! }),
      ...this.storyColumnLabel({
        multi_select: story.labels?.map(({ name }) => ({ name })),
      }),
      ...this.storyColumnStatus({
        multi_select: story.status ? [{ name: story.status }] : undefined,
      }),
      ...this.storyColumnType({
        multi_select: story.type ? [{ name: story.type }] : undefined,
      }),
      ...this.storyColumnURL({ url: story.url! }),
      ...this.storyColumnDate({
        start:
          start && story.status?.toLowerCase() === 'completed' ? start : null,
      }),
    };
  };

  private storyColumnID = ({ number }: ColumnIDParams) => {
    const column = {
      ID: {
        number,
      },
    } as NotionTableColumn;

    return column as any;
  };

  private storyColumnTask = ({ content }: ColumnTaskParams) => {
    const column = {
      Task: {
        title: [
          {
            text: {
              content,
            },
          },
        ],
      },
    } as NotionTableColumn;

    return column as any;
  };

  private storyColumnLabel = ({
    multi_select,
  }: ColumnMultiSelectParams): NotionTableColumn => {
    if (!multi_select) return {};

    const column = {
      Labels: {
        type: 'multi_select',
        multi_select,
      },
    } as NotionTableColumn;

    return column as any;
  };

  private storyColumnStatus = ({
    multi_select,
  }: ColumnMultiSelectParams): NotionTableColumn => {
    if (!multi_select) return {};

    const column = {
      Status: {
        type: 'multi_select',
        multi_select,
      },
    } as NotionTableColumn;

    return column as any;
  };

  private storyColumnType = ({
    multi_select,
  }: ColumnMultiSelectParams): NotionTableColumn => {
    if (!multi_select) return {};

    const column = {
      Type: {
        type: 'multi_select',
        multi_select,
      },
    } as NotionTableColumn;

    return column as any;
  };

  private storyColumnURL = ({ url }: ColumnURLParams): NotionTableColumn => {
    const column = {
      URL: {
        type: 'url',
        url,
      },
    } as NotionTableColumn;

    return column as any;
  };

  private storyColumnDate = ({
    start,
  }: ColumnCompletedParams): NotionTableColumn => {
    if (start === undefined) return {};

    const column = {
      Completed: {
        type: 'date',
        date:
          start === null
            ? null
            : {
                start,
              },
      },
    } as NotionTableColumn;

    return column as any;
  };
}

export default StoryNotion;
