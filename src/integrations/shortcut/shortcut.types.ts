export type ShorcutEvent = {
  id: string;
  changed_at: string;
  version: string;
  primary_id: number;
  member_id: string;
  references: (ShorcutReferenceWorkflow | ShorcutReferenceLabel)[];
  actions: ShorcutAction[];
};

type StoryType = 'bug' | 'feature' | 'chore';

type ShorcutReferenceWorkflow = {
  id: number;
  entity_type: 'workflow-state';
  name: 'Ready for Development' | 'In Development';
  type: string;
};

export type ShorcutReferenceLabel = {
  id: number;
  entity_type: 'label';
  name: string;
  app_url: string;
};

type ShorcutAction = {
  id: number;
  entity_type: 'story' | 'story-comment';
  action: 'create' | 'update' | 'delete';
  name: string;
  story_type: StoryType;
  app_url: string;
  changes: ShorcutActionChanges;
};

type ShorcutActionChange = {
  adds?: number[];
  removes?: number[];
};

type ShorcutActionChanges = {
  started?: { new: boolean; old: boolean };
  position?: { new: number; old: number };
  workflow_state_id?: { new: number; old: number };
  started_at?: { old: string };
  story_type?: {
    new: StoryType;
    old: StoryType;
  };
  label_ids?: ShorcutActionChange;
  owner_ids?: ShorcutActionChange;
};
