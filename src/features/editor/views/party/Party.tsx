import { useState } from 'react';
import {
  Content,
  ContentHeader,
  ContentSection,
  type Tab,
} from '@features/editor/components';

type ActiveSection = 'current' | 'kris' | 'susie' | 'ralsei' | 'noelle';

const PARTY_TABS: Array<Tab<ActiveSection>> = [
  { id: 'current', label: 'Current' },
  { id: 'kris', label: 'Kris' },
  { id: 'susie', label: 'Susie' },
  { id: 'ralsei', label: 'Ralsei' },
  { id: 'noelle', label: 'Noelle' },
];

export const PartyCharacters = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('current');

  const renderDetailContent = () => {
    switch (activeSection) {
      case 'current':
        return (
          <ContentSection>
            <ContentHeader title="Current Party" />
          </ContentSection>
        );
      case 'kris':
        return (
          <ContentSection>
            <h1 className="text-2xl font-bold text-[#faf4ed] mb-3 px-4">
              Kris&rsquo;s
            </h1>
          </ContentSection>
        );
      case 'susie':
        return (
          <ContentSection>
            <h1 className="text-2xl font-bold text-main mb-3 px-4">
              Susie&rsquo;s
            </h1>
          </ContentSection>
        );
      case 'ralsei':
        return (
          <ContentSection>
            <h1 className="text-2xl font-bold text-main mb-3 px-4">
              Ralsei&rsquo;s
            </h1>
          </ContentSection>
        );
      case 'noelle':
        return (
          <ContentSection>
            <h1 className="text-2xl font-bold text-main mb-3 px-4">
              Noelle&rsquo;s
            </h1>
          </ContentSection>
        );
      default:
        return null;
    }
  };

  return (
    <Content
      title="Party"
      tabs={PARTY_TABS}
      activeTab={activeSection}
      onTabChange={setActiveSection}
    >
      {renderDetailContent()}
    </Content>
  );
};
