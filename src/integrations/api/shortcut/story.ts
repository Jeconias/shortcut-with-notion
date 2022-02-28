import APIBaseShortcut from './base';
import { GetStoryRequest, GetStoryResponse } from './story.types';

const details = ({ id }: GetStoryRequest) =>
  APIBaseShortcut.get<GetStoryResponse>(`/stories/${id}`);

export default { details };
