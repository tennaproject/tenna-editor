import { HomePage as HomePageParent } from './Home';
import { Upload } from './Upload';
import { Download } from './Download';
import { SavesList } from './SavesList';

type HomePageComponent = typeof HomePageParent & {
  Upload: typeof Upload;
  Download: typeof Download;
  SavesList: typeof SavesList;
};

const HomePage = HomePageParent as HomePageComponent;
HomePage.Upload = Upload;
HomePage.Download = Download;
HomePage.SavesList = SavesList;

export { HomePage };
