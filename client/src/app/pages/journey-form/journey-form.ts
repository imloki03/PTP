import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Button} from '../../ui/button/button';
import {JourneyService} from '../../services/journey';
import {CountryService} from '../../services/country';
import {CurrencyService} from '../../services/currency';
import {ActivatedRoute} from '@angular/router';
import type {Country} from '../../models/country';
import type {Currency} from '../../models/currency';
import type {Place} from '../../models/place';
import type {JourneyRequest} from '../../models/journey-request';
import type {JourneyStatus} from '../../models/journey-status';

@Component({
  selector: 'app-journey-form',
  imports: [
    RouterLink, MatIcon, TranslatePipe,
    Button,
  ],
  templateUrl: './journey-form.html',
  styleUrls: ['./journey-form.css'],
})
export class JourneyForm implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly journeyService = inject(JourneyService);
  private readonly countryService = inject(CountryService);
  private readonly currencyService = inject(CurrencyService);
  protected readonly translate = inject(TranslateService);

  mode: 'create' | 'edit' = 'create';
  journeyId: number | null = null;

  countries = signal<Country[]>([]);
  currencies = signal<Currency[]>([]);
  allPlaces = signal<Place[]>([]);

  name = signal('');
  description = signal('');
  countryId = signal<number | string>('');
  placeId = signal<number | string>('');
  startDate = signal('');
  endDate = signal('');
  currencyId = signal<number | string>('');
  amount = signal<number | string>('');
  durationDay = signal<number | string>('');
  durationNight = signal<number | string>('');
  status = signal<JourneyStatus | string>('PLANNING');

  saving = signal(false);

  errors = signal<{
    name?: string;
    description?: string;
    country?: string;
    startDate?: string;
    endDate?: string;
    durationDay?: string;
    durationNight?: string;
    duration?: string;
    status?: string;
  }>({});

  topError = signal(false);

  protected clearError(field: string) {
    this.errors.update(e => ({ ...e, [field]: undefined }));
    const remaining = Object.values(this.errors()).some(v => v !== undefined);
    if (!remaining) { this.topError.set(false); }
  }

  ngOnInit() {
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.mode = 'edit';
      this.journeyId = +idParam;
    }

    this.countryService.getCountries().subscribe(res => {
      if (res.data) {
        this.countries.set(res.data);
      }
      if (this.mode === 'edit') {
        this.loadJourney();
      }
    });

    this.currencyService.getCurrencies().subscribe(res => {
      if (res.data) {
        this.currencies.set(res.data);
      }
    });
  }

  private loadJourney() {
    const id = this.journeyId;
    if (!id) { return; }
    this.journeyService.getJourney(id).subscribe(res => {
      if (!res.data) { return; }
      const j = res.data;
      this.name.set(j.name);
      this.description.set(j.description);
      this.countryId.set(j.country?.id ?? '');
      this.updatePlacesForCountry();
      this.placeId.set(j.place?.id ?? '');
      this.startDate.set(j.startDate ?? '');
      this.endDate.set(j.endDate ?? '');
      this.currencyId.set(j.currency?.id ?? '');
      this.amount.set(j.amount ?? '');
      this.durationDay.set(j.durationDay ?? '');
      this.durationNight.set(j.durationNight ?? '');
      this.status.set(j.status);
    });
  }

  onCountryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.countryId.set(value);
    this.clearError('country');
    this.updatePlacesForCountry();
  }

  private updatePlacesForCountry() {
    this.placeId.set('');
    const id = this.countryId();
    if (id === '' || id === null) {
      this.allPlaces.set([]);
      return;
    }
    const numericId = typeof id === 'string' ? +id : id;
    const country = this.countries().find(c => c.id === numericId);
    this.allPlaces.set(country?.places ?? []);
  }

  onStartDateChange(value: string) {
    this.startDate.set(value);
    this.clearError('startDate');
    this.clearError('endDate');
    this.clearError('durationDay');
    this.clearError('durationNight');
    this.autoCalcDuration();
  }

  onEndDateChange(value: string) {
    this.endDate.set(value);
    this.clearError('endDate');
    this.clearError('durationDay');
    this.clearError('durationNight');
    this.autoCalcDuration();
  }

  private autoCalcDuration() {
    const sd = this.startDate();
    const ed = this.endDate();
    if (!sd || !ed) { return; }
    const start = new Date(sd);
    const end = new Date(ed);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) { return; }
    const diffMs = end.getTime() - start.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 0) { return; }
    this.durationDay.set(diffDays + 1);
    this.durationNight.set(diffDays);
  }

  get countryOptions() {
    return this.countries();
  }

  get currencyOptions() {
    return this.currencies();
  }

  get placeOptions() {
    return this.allPlaces();
  }

  get statusOptions() {
    return ['PLANNING', 'IN_PROGRESS', 'FINISHED'] as const;
  }

  private validate(): boolean {
    const t = (key: string, params?: Record<string, unknown>) => this.translate.instant(key, params);
    const errs: {
      name?: string; description?: string; country?: string;
      startDate?: string; endDate?: string;
      durationDay?: string; durationNight?: string; duration?: string;
      status?: string;
    } = {};

    if (!this.name().trim()) {
      errs.name = t('validation.required', { field: t('journeyForm.labelName') });
    }
    if (!this.description().trim()) {
      errs.description = t('validation.required', { field: t('journeyForm.labelDescription') });
    }
    if (!this.countryId()) {
      errs.country = t('validation.required', { field: t('journeyForm.labelCountry') });
    }
    if (!this.startDate()) {
      errs.startDate = t('validation.required', { field: t('journeyForm.labelStartDate') });
    }
    if (!this.status()) {
      errs.status = t('validation.required', { field: t('journeyForm.labelStatus') });
    }

    const sd = this.startDate();
    const ed = this.endDate();
    if (sd && ed && ed <= sd) {
      errs.endDate = t('validation.endDateGreater');
    }

    const dd = this.durationDay();
    const dn = this.durationNight();
    const day = typeof dd === 'string' ? +dd : dd;
    const night = typeof dn === 'string' ? +dn : dn;

    if (dd !== '' && day <= 0) {
      errs.durationDay = t('validation.greaterThanZero');
    }
    if (dn !== '' && night <= 0) {
      errs.durationNight = t('validation.greaterThanZero');
    }
    if (day > 0 && night > 0 && Math.abs(day - night) > 1) {
      errs.duration = t('validation.durationInvalid');
    }

    if (sd && ed && dd !== '' && day > 0) {
      const start = new Date(sd);
      const end = new Date(ed);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        if (day > diff) {
          errs.durationDay = t('validation.dayMismatch');
        }
        if (night > 0 && night > diff) {
          errs.durationNight = t('validation.nightMismatch');
        }
      }
    }

    this.errors.set(errs);
    this.topError.set(Object.keys(errs).length > 0);
    return Object.keys(errs).length === 0;
  }

  save() {
    if (this.saving()) { return; }
    this.topError.set(false);
    this.errors.set({});

    if (!this.validate()) { return; }

    this.saving.set(true);

    const request: JourneyRequest = {
      name: this.name(),
      description: this.description(),
      countryId: this.countryId() ? +this.countryId() : 0,
      placeId: this.placeId() !== '' ? +this.placeId() : null,
      startDate: this.startDate(),
      endDate: this.endDate() || null,
      currencyId: this.currencyId() !== '' ? +this.currencyId() : null,
      amount: this.amount() !== '' ? +this.amount() : null,
      durationDay: this.durationDay() !== '' ? +this.durationDay() : null,
      durationNight: this.durationNight() !== '' ? +this.durationNight() : null,
      status: this.status() as JourneyStatus,
    };

    const obs = this.mode === 'create'
      ? this.journeyService.createJourney(request)
      : this.journeyService.updateJourney(this.journeyId!, request);

    obs.subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/journeys']);
      },
      error: () => {
        this.saving.set(false);
      },
    });
  }

  discard() {
    this.router.navigate(['/journeys']);
  }

  onNewJourney() {
    this.router.navigate(['/journeys/new']);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
