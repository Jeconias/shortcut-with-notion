import {
  ShortcutLabel,
  ShortcutStory,
} from '~/src/integrations/api/shortcut/story.types';
import { ShorcutEvent } from '~/src/integrations/shortcut/shortcut.types';

class StoryShortcut {
  private story: Partial<ShortcutStory> | undefined;
  private event: Partial<ShorcutEvent> | undefined;

  constructor(story: Partial<ShortcutStory>, event?: ShorcutEvent) {
    this.story = story;
    this.event = event;
  }

  public getId = () => this.story?.id;

  public getStory = () => ({
    id: this.story?.id,
    name: this.story?.name,
    labels: this.getLabels(this.story?.labels),
    status: this.getStatus(),
    type: this?.story?.story_type,
    url: this.story?.app_url,
    completedAt: this.story?.completed_at,
  });

  private getStatus = () => {
    if (!this.event?.references) return null;

    return (
      this.event.references.find(
        (ref) => ref.id === this.story?.workflow_state_id
      )?.name ?? null
    );
  };

  private getLabels = (data: ShortcutLabel[] | undefined) => {
    if (!data) return [];
    return data.map(({ id, name }) => ({ id, name }));
  };
}

export default StoryShortcut;
