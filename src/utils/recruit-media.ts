const RECRUIT_MEDIA = import.meta.glob<string>(
  '../assets/deltarune/recruits/*.{png,gif,jpg,jpeg,webp}',
  { eager: true, import: 'default', query: '?url' },
);

const RECRUIT_MEDIA_BY_NAME = new Map(
  Object.entries(RECRUIT_MEDIA).map(([path, src]) => {
    const file = path.slice(path.lastIndexOf('/') + 1);
    const stem = file.slice(0, file.lastIndexOf('.'));
    return [stem.toLowerCase(), src] as const;
  }),
);

export function getRecruitMediaSrc(enemyName: string): string | undefined {
  return RECRUIT_MEDIA_BY_NAME.get(enemyName.toLowerCase());
}
