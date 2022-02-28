import {
  NotionTableColumn,
  TableTypeMultSelectItem,
} from '~/src/integrations/notion/notion.types';
import StoryShortcut from './Story.shortcut';
import { format, utcToZonedTime } from 'date-fns-tz';

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
  start: string | Date;
};

class StoryNotion {
  private story: StoryShortcut | undefined;

  constructor(story: StoryShortcut) {
    this.story = story;
  }

  public toProperties = () => {
    const story = this.story?.getStory();

    if (!story) return undefined;

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
      ...this.storyColumnDate({ start: story.completedAt! }),
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
    if (!start) return {};

    const column = {
      Completed: {
        type: 'date',
        date: {
          start: utcToZonedTime(start, 'America/Sao_Paulo'),
          time_zone: 'America/Sao_Paulo',
        },
      },
    } as NotionTableColumn;

    return column as any;
  };
}

export default StoryNotion;
