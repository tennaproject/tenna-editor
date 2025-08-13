import { InventoryPage as InventoryPageParent } from './Inventory';
import { Consumables } from './Consumables';
import { KeyItems } from './KeyItems';
import { Weapons } from './Weapons';
import { Armors } from './Armors';

type InventoryPageComponent = typeof InventoryPageParent & {
  Consumables: typeof Consumables;
  KeyItems: typeof KeyItems;
  Weapons: typeof Weapons;
  Armors: typeof Armors;
};

const InventoryPage = InventoryPageParent as InventoryPageComponent;
InventoryPage.Consumables = Consumables;
InventoryPage.KeyItems = KeyItems;
InventoryPage.Weapons = Weapons;
InventoryPage.Armors = Armors;

export { InventoryPage };
