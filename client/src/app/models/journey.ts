import type {Country} from './country';
import type {Currency} from './currency';
import type {HateoasResource} from './hateoas-link';
import type {Place} from './place';
import type {JourneyStatus} from './journey-status';

export interface Journey extends HateoasResource {
  id: number;
  name: string;
  description: string;
  country: Country;
  place: Place;
  startDate: string;
  endDate: string;
  currency: Currency;
  amount: number;
  durationDay: number;
  durationNight: number;
  status: JourneyStatus;
  version: number;
}
