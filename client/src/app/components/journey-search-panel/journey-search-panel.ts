import {Component, inject, input, OnInit, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Button} from '../../ui/button/button';
import {CountryService} from '../../services/country';
import {CurrencyService} from '../../services/currency';
import type {Country} from '../../models/country';
import type {Currency} from '../../models/currency';
import type {JourneyFilter} from '../../models/journey-filter';
import {JOURNEY_STATUS_VALUES} from '../../models/journey-status';

@Component({
  selector: 'app-journey-search-panel',
  imports: [FormsModule, MatIcon, Button, TranslatePipe],
  templateUrl: './journey-search-panel.html',
  styleUrls: ['./journey-search-panel.css'],
})
export class JourneySearchPanel implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly countryService = inject(CountryService);
  private readonly currencyService = inject(CurrencyService);

  countries = signal<Country[]>([]);
  currencies = signal<Currency[]>([]);
  readonly onSearch = output<JourneyFilter>();
  readonly onReset = output<void>();
  readonly initialFilter = input<JourneyFilter | null>(null);

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

  ngOnInit() {
    this.countryService.getCountries().subscribe((res) => {
      if (res.data) {
        this.countries.set(res.data);
      }
    });

    this.currencyService.getCurrencies().subscribe((res) => {
      if (res.data) {
        this.currencies.set(res.data);
      }
    });

    const saved = this.initialFilter();
    if (saved) {
      this.applyFilter(saved);
    }
  }

  private applyFilter(f: JourneyFilter) {
    this.searchQuery = f.searchQuery ?? '';
    this.selectedCountry = f.countryId ?? '';
    this.selectedCurrency = f.currencyId ?? '';
    this.selectedStatus = f.status ?? '';
    this.amountFrom = f.amountFrom ?? '';
    this.amountTo = f.amountTo ?? '';
    this.startDate = f.startDateFrom ?? '';
    this.startDateTo = f.startDateTo ?? '';
    this.endDate = f.endDateFrom ?? '';
    this.endDateTo = f.endDateTo ?? '';
  }

  get countryOptions() {
    return this.countries().map((c) => ({ value: c.id, label: `${c.name}` }));
  }

  get currencyOptions() {
    return this.currencies().map((c) => ({ value: c.id, label: `${c.name}` }));
  }

  get statusOptions() {
    return JOURNEY_STATUS_VALUES.map((s) => ({ value: s, label: this.translate.instant('status.' + s) }));
  }

  search() {
    const filter: JourneyFilter = {};
    if (this.searchQuery) { filter.searchQuery = this.searchQuery; }
    if (this.selectedCountry) { filter.countryId = Number(this.selectedCountry); }
    if (this.selectedCurrency) { filter.currencyId = Number(this.selectedCurrency); }
    if (this.selectedStatus) { filter.status = String(this.selectedStatus); }
    if (this.amountFrom) { filter.amountFrom = Number(this.amountFrom); }
    if (this.amountTo) { filter.amountTo = Number(this.amountTo); }
    if (this.startDate) { filter.startDateFrom = this.startDate; }
    if (this.startDateTo) { filter.startDateTo = this.startDateTo; }
    if (this.endDate) { filter.endDateFrom = this.endDate; }
    if (this.endDateTo) { filter.endDateTo = this.endDateTo; }
    this.onSearch.emit(filter);
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
    this.onReset.emit();
  }
}
