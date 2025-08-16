import { Card as CardParent } from './Card';
import { CardHeader } from './CardHeader';

type CardComponent = typeof CardParent & {
  Header: typeof CardHeader;
};

const Card = CardParent as CardComponent;
Card.Header = CardHeader;

export { Card };
