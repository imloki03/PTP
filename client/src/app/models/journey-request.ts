import type {JourneyStatus} from './journey-status';

export interface JourneyRequest {
  name: string;
  description: string;
  countryId: number;
  placeId: number | null;
  startDate: string;
  endDate: string | null;
  currencyId: number | null;
  amount: number | null;
  durationDay: number | null;
  durationNight: number | null;
  status: JourneyStatus;
  version: number | null;
}
