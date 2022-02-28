import dotenv from 'dotenv';

dotenv.config();

type Env = 'dev' | 'prod';

export const {
  PORT,
  NOTION_TOKEN,
  NOTION_DATABASE_ID,
  SHORTCUT_SECRET_KEY,
  SHORTCUT_API_TOKEN,
  SHORTCUT_API_BASE,
  SHORTCUT_OWNER_ID,
} = process.env;

export const ENV = process.env.NODE_ENV as Env;

export const DEBUG =
  process.env.DEBUG?.toLowerCase() === 'true' ||
  process.env.DEBUG === '1' ||
  parseInt(process.env.DEBUG || '0') > 0;
