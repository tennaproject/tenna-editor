import { HomePage as HomePageParent } from './Home';
import { Overview } from './Overview';
import { Upload } from './Upload';
import { Download } from './Download';
import { SavesList } from './SavesList';

type HomePageComponent = typeof HomePageParent & {
  Overview: typeof Overview;
  Upload: typeof Upload;
  Download: typeof Download;
  SavesList: typeof SavesList;
};

const HomePage = HomePageParent as HomePageComponent;
HomePage.Overview = Overview;
HomePage.Upload = Upload;
HomePage.Download = Download;
HomePage.SavesList = SavesList;

export { HomePage };
