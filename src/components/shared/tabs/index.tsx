import './tabs.scss';
import { useState, useMemo, useCallback } from 'react';
import { JSX } from '@babel/types';

export interface TabItem {
  label: string,
  component: () => JSX.Element,
  slug: string
}

export interface TabsProps {
  tabs: TabItem[],
}

export default function Tabs({ tabs }: TabsProps ) {
  const slugs = tabs.map(({ slug }) => slug);

  type TabsSlugs = typeof slugs[number];
  const [activeTab, setActiveTab] = useState<TabsSlugs>(tabs[0].slug);

  const activeTabComponent = useMemo<(() => JSX.Element) | null>(() => {
    const activeComponent = tabs.find(({ slug }) => slug === activeTab);

    return activeComponent?.component ?? null;
  }, [tabs, activeTab]);

  const handleTabClick = useCallback((e, slug) => {
    e.preventDefault();
    setActiveTab(slug);
  }, [setActiveTab]);

  return (
    <div className='tabs'>
      <ul>
        {tabs.map(tab => (
          <li key={tab.slug}>
            <button
              onClick={(e) => handleTabClick(e, tab.slug)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      <div className='container'>
        {activeTabComponent ? activeTabComponent() : null}
      </div>
    </div>
  )
}
