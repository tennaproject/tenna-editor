import { AboutPage as AboutPageParent } from './About';
import { Overview } from './Overview';
import { Changelog } from './Changelog';
import { License } from './License';
import { Attributions } from './Attributions';

type AboutPageComponent = typeof AboutPageParent & {
  Overview: typeof Overview;
  Changelog: typeof Changelog;
  License: typeof License;
  Attributions: typeof Attributions;
};

const AboutPage = AboutPageParent as AboutPageComponent;
AboutPage.Overview = Overview;
AboutPage.Changelog = Changelog;
AboutPage.License = License;
AboutPage.Attributions = Attributions;

export { AboutPage };
