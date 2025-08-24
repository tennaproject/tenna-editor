import { DevtoolsPage as DevtoolsPageParent } from './Devtools';
import { Colors } from './Colors';

type DevtoolsPageComponent = typeof DevtoolsPageParent & {
  Colors: typeof Colors;
};

const DevtoolsPage = DevtoolsPageParent as DevtoolsPageComponent;
DevtoolsPage.Colors = Colors;

export { DevtoolsPage };
