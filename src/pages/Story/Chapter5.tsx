import { Card, Heading } from '@components';

export function StoryChapter5() {
  return (
    <article className="page flex flex-col gap-3">
      <Card className="flex flex-col gap-4 p-6">
        <Heading level={2}>Coming Soon</Heading>
        <p className="text-text-2">
          Story flag editing for Chapter 5 is not available yet.
        </p>
        <div className="ui-panel-muted border-yellow/40 bg-yellow-soft text-text-1 flex flex-col gap-3 p-4">
          <p>Chapter 5 support is available in Tenna Editor.</p>
          <p className="flex items-start gap-1">
            <span className="text-green font-bold shrink-0">[NEW]</span>
            <span>
              Basic features like recruits, rooms, items, weapons, and armors
              are in place.
            </span>
          </p>
          <p>Flags and plot points will come later.</p>
        </div>
      </Card>
    </article>
  );
}
