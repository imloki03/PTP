export interface JourneyFilter {
  searchQuery?: string;
  countryId?: number;
  currencyId?: number;
  status?: string;
  amountFrom?: number;
  amountTo?: number;
  startDateFrom?: string;
  startDateTo?: string;
  endDateFrom?: string;
  endDateTo?: string;
}
