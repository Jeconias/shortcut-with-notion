import { Client } from '@notionhq/client';
import { NOTION_TOKEN } from '../utils/constants';

class Notion {
  private static instance: Notion | undefined;
  private client: Client | undefined;

  private constructor() {
    this.client = new Client({
      auth: NOTION_TOKEN,
    });
  }

  public getClient = () => this.client;

  public static init = () => {
    if (Notion.instance) {
      console.log('Reusing Notion client');
      return Notion.instance;
    }

    console.log('Create new Notion client');
    Notion.instance = new Notion();
    return Notion.instance;
  };
}

export default Notion;
