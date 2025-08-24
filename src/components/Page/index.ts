import { Page as PageParent } from './Page';
import { PageContent } from './PageContent';
import { PageNav } from './PageNav';
import { PageNavItem } from './PageNavItem';
import { PageTopBar } from './PageTopBar';

type PageComponent = typeof PageParent & {
  TopBar: typeof PageTopBar;
  Nav: typeof PageNav;
  NavItem: typeof PageNavItem;
  Content: typeof PageContent;
};

const Page = PageParent as PageComponent;
Page.TopBar = PageTopBar;
Page.Nav = PageNav;
Page.NavItem = PageNavItem;
Page.Content = PageContent;

export { Page };
