import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Button } from '../../ui/button/button';
import type { Country } from '../../models/country';
import type { Currency } from '../../models/currency';
import { JOURNEY_STATUS_VALUES } from '../../models/journey-status';

@Component({
  selector: 'app-journey-search-panel',
  imports: [FormsModule, MatIcon, Button, TranslatePipe],
  templateUrl: './journey-search-panel.html',
  styleUrls: ['./journey-search-panel.css'],
})
export class JourneySearchPanel {
  private readonly translate = inject(TranslateService);

  readonly countries = input<Country[]>([]);
  readonly currencies = input<Currency[]>([]);
  readonly onSearch = output<void>();
  readonly onReset = output<void>();

  searchQuery = '';
  selectedCountry: string | number = '';
  selectedCurrency: string | number = '';
  selectedStatus: string | number = '';
  amountFrom: string | number = '';
  amountTo: string | number = '';
  startDate = '';
  startDateTo = '';
  endDate = '';
  endDateTo = '';

  get countryOptions() {
    return this.countries().map((c) => ({ value: c.id, label: `${c.code} ${c.name}` }));
  }

  get currencyOptions() {
    return this.currencies().map((c) => ({ value: c.id, label: `${c.code} - ${c.name}` }));
  }

  get statusOptions() {
    return JOURNEY_STATUS_VALUES.map((s) => ({ value: s, label: this.translate.instant('status.' + s) }));
  }

  reset() {
    this.searchQuery = '';
    this.selectedCountry = '';
    this.selectedCurrency = '';
    this.selectedStatus = '';
    this.amountFrom = '';
    this.amountTo = '';
    this.startDate = '';
    this.startDateTo = '';
    this.endDate = '';
    this.endDateTo = '';
  }
}
