import StoryNotion from '../core/entities/Story.notion';
import StoryShortcut from '../core/entities/Story.shortcut';
import Notion from '../core/Notion';
import api from '../integrations/api/api';
import {
  QueryNotionResponse,
  StoryTableType,
} from '../integrations/notion/notion.types';
import { ShorcutEvent } from '../integrations/shortcut/shortcut.types';
import { NOTION_DATABASE_ID, SHORTCUT_OWNER_ID } from '../utils/constants';
import { RequestHandlerAPI } from './types';

class ShortcutController {
  static webhook: RequestHandlerAPI = async (req, _, next) => {
    const body = req.body as ShorcutEvent;
    const notion = Notion.init();

    try {
      const pagesFromNotion = (await notion.getClient()?.databases.query({
        database_id: NOTION_DATABASE_ID!,
        page_size: 20,
      })) as QueryNotionResponse<StoryTableType> | undefined;

      const pages =
        pagesFromNotion?.results
          ?.map((p) => ({
            storyId: p.properties?.ID?.number,
            pageId: p.id,
          }))
          ?.filter((value) => Number.isInteger(value.storyId)) ?? [];

      const storyDetails = (
        await api.shortcut.story.details({
          id: body.primary_id,
        })
      ).data;

      if (!storyDetails) throw new Error('Story details not found');

      if (
        SHORTCUT_OWNER_ID &&
        !storyDetails?.owner_ids?.includes(SHORTCUT_OWNER_ID)
      ) {
        throw new Error(`User from Shortcut is not owner of this Story`);
      }

      const story = new StoryShortcut(storyDetails, body);
      const storyId = story.getId();
      const page = pages?.find((p) => p.storyId === storyId);

      const notionStory = new StoryNotion(
        story,
        pagesFromNotion?.results?.find(
          (p) => p.properties?.ID?.number === storyId
        )?.properties
      );

      if (page) {
        // Update
        console.log(`UPDATE: StoryID -> ${storyId}`);

        return notion.getClient()?.pages.update({
          page_id: page.pageId,
          properties: notionStory.toProperties(),
        });
      } else {
        //Create
        console.log(`CREATE: StoryID -> ${storyId}`);

        return notion.getClient()?.pages.create({
          parent: { database_id: NOTION_DATABASE_ID! },
          properties: notionStory.toProperties(),
        });
      }
    } catch (err: any) {
      next({
        message: err.message,
        code: err.code,
      });
    }
  };
}

export default ShortcutController;
