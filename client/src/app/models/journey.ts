import type {Country} from './country';
import type {Currency} from './currency';
import type {HateoasResource} from './hateoas-link';
import type {JourneyImageItem} from './journey-image-item';
import type {Place} from './place';
import type {JourneyStatus} from './journey-status';

export interface Journey extends HateoasResource {
  id: number;
  version: number;
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
  images?: JourneyImageItem[];
  firstImageId?: number;
  firstImageUrl?: string;
  firstImageStorageType?: string;
  firstImage?: {
    id: string;
    thumbnailUrl: string;
    altText?: string;
  } | null;
}
