import { PartyPage as PartyPageParent } from './Party';
import { Overview } from './Overview';
import { Kris } from './Kris';
import { Susie } from './Susie';
import { Ralsei } from './Ralsei';
import { Noelle } from './Noelle';

type PartyPageComponent = typeof PartyPageParent & {
  Overview: typeof Overview;
  Kris: typeof Kris;
  Susie: typeof Susie;
  Ralsei: typeof Ralsei;
  Noelle: typeof Noelle;
};

const PartyPage = PartyPageParent as PartyPageComponent;
PartyPage.Overview = Overview;
PartyPage.Kris = Kris;
PartyPage.Susie = Susie;
PartyPage.Ralsei = Ralsei;
PartyPage.Noelle = Noelle;

export { PartyPage };
