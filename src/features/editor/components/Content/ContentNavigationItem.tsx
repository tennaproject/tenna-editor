import { useContent } from './Content';

export interface ContentNavigationItemProps {
  id: string;
  title: string;
}

export const ContentNavigationItem = ({
  id,
  title,
}: ContentNavigationItemProps) => {
  const { activeSubtabId, setActiveSubtabId } = useContent();

  return (
    <button
      key={id}
      onClick={() => setActiveSubtabId(id)}
      className={`px-3 py-1 font-semibold transition-colors duration-200 ${
        activeSubtabId === id
          ? 'bg-surface-1-active text-text-1'
          : 'bg-transparent text-text-2 hover:text-text-1 hover:bg-surface-1-hover'
      }`}
    >
      {title}
    </button>
  );
};
