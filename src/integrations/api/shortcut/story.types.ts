export type GetStoryRequest = {
  id: number;
};

export type ShortcutLabel = {
  app_url: string;
  color: string;
  created_at: string;
  description: string;
  entity_type: string;
  external_id: string;
  id: number;
  name: string;
  updated_at: string;
};

type ShortcutTask = {
  complete: true;
  completed_at: string;
  created_at: string;
  description: string;
  entity_type: string;
  id: number;
  owner_ids: string[];
  position: number;
  story_id: number;
  updated_at: string;
};

export type ShortcutStory = {
  app_url: string;
  completed: boolean;
  completed_at: string;
  completed_at_override: string;
  created_at: string;
  description: string;
  entity_type: string;
  epic_id: number;
  external_id: string;
  id: number;
  iteration_id: number;
  label_ids: number[];
  labels: ShortcutLabel[];
  name: string;
  owner_ids: string[];
  requested_by_id: string;
  started: boolean;
  started_at: string;
  started_at_override: string;
  story_type: string;
  tasks: ShortcutTask[];
  updated_at: string;
  workflow_id: number;
  workflow_state_id: number;
};

export type GetStoryResponse = ShortcutStory;
