import axios from 'axios';
import {
  SHORTCUT_API_BASE,
  SHORTCUT_API_TOKEN,
} from '../../../utils/constants';

const APIBaseShortcut = axios.create({
  baseURL: SHORTCUT_API_BASE,
});

APIBaseShortcut.interceptors.request.use(function (config) {
  const token = SHORTCUT_API_TOKEN;

  if (token && config.headers) {
    config.headers['Shortcut-Token'] = token;
  }

  return config;
});

export default APIBaseShortcut;
