import type { Place } from './place';

export interface Country {
  id: number;
  code: string;
  name: string;
  places: Place[];
}
