import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Button} from '../../ui/button/button';
import {JourneyService} from '../../services/journey';
import {FileService} from '../../services/file';
import {CountryService} from '../../services/country';
import {CurrencyService} from '../../services/currency';
import {JourneyImageManager} from '../../components/journey-images/journey-image-manager';
import {ConfirmImageDeletionDialog} from '../../ui/confirm-image-deletion-dialog/confirm-image-deletion-dialog';
import {PageLayout} from '../page-layout/page-layout';
import type {Country} from '../../models/country';
import type {Currency} from '../../models/currency';
import type {Journey} from '../../models/journey';
import type {JourneyImageItem} from '../../models/journey-image-item';
import type {Place} from '../../models/place';
import type {JourneyRequest} from '../../models/journey-request';
import type {JourneyStatus} from '../../models/journey-status';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-journey-form',
  imports: [
    RouterLink, MatIcon, TranslatePipe,
    Button, JourneyImageManager, PageLayout,
  ],
  templateUrl: './journey-form.html',
  styleUrls: ['./journey-form.css'],
})
export class JourneyForm implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly journeyService = inject(JourneyService);
  private readonly fileService = inject(FileService);
  private readonly countryService = inject(CountryService);
  private readonly currencyService = inject(CurrencyService);
  private readonly dialog = inject(MatDialog);
  protected readonly translate = inject(TranslateService);
  private readonly t = (key: string, params?: Record<string, unknown>) => this.translate.instant(key, params);

  mode: 'create' | 'edit' = 'create';
  journeyId: number | null = null;
  private loadedJourney: Journey | null = null;

  countries = signal<Country[]>([]);
  currencies = signal<Currency[]>([]);
  allPlaces = signal<Place[]>([]);

  version = signal<number | null>(null);
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
  uploadError = signal<string | null>(null);

  private readonly maxFileSize = 5 * 1024 * 1024;
  private readonly maxTotalSize = 50 * 1024 * 1024;

  images = signal<JourneyImageItem[]>([]);
  focusedImageId = signal<string | null>(null);
  nextClientId = 1;

  private addImagesFromFiles(files: File[]) {
    const newItems: JourneyImageItem[] = [];
    let skipped = 0;
    const currentSize = this.images()
      .filter(i => i.file)
      .reduce((sum, i) => sum + (i.file?.size ?? 0), 0);
    for (const file of files) {
      if (!file.type.startsWith('image/')) { continue; }
      if (file.size > this.maxFileSize) {
        skipped++;
        continue;
      }
      if (currentSize + newItems.reduce((s, i) => s + (i.file?.size ?? 0), 0) + file.size > this.maxTotalSize) {
        skipped++;
        continue;
      }
      const clientId = 'img_' + this.nextClientId++;
      newItems.push({
        clientId,
        file,
        sourceUrl: URL.createObjectURL(file),
        fileName: file.name,
        status: 'local',
      });
    }
    if (skipped > 0) {
      this.uploadError.set(this.t('file.sizeExceeded', {count: skipped}));
    }
    if (newItems.length === 0) { return; }
    this.images.update(curr => [...curr, ...newItems]);
    const allImages = this.images();
    if (allImages.length === newItems.length) {
      this.focusedImageId.set(newItems[0].clientId);
    }
  }

  ngOnDestroy() {
    for (const img of this.images()) {
      if (img.sourceUrl.startsWith('blob:')) {
        URL.revokeObjectURL(img.sourceUrl);
      }
    }
  }

  onFilesSelected(files: File[]) {
    this.addImagesFromFiles(files);
  }

  onFocusImage(imageId: string) {
    this.focusedImageId.set(imageId);
  }

  onRequestDelete(imageId: string) {
    const img = this.images().find(i => i.clientId === imageId);
    if (!img) { return; }
    const dialogRef = this.dialog.open(ConfirmImageDeletionDialog, {
      data: { imageName: img.fileName },
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) { return; }
      if (img.serverId) {
        if (img.sourceUrl.startsWith('blob:')) {
          URL.revokeObjectURL(img.sourceUrl);
        }
        this.images.update(curr => curr.filter(i => i.clientId !== imageId));
        if (this.focusedImageId() === imageId) {
          this.updateFocusAfterDelete();
        }
        this.fileService.deleteImage(img.serverId).subscribe({
          error: () => {
            this.images.update(curr => [...curr, img]);
            if (this.focusedImageId() === null) {
              this.focusedImageId.set(img.clientId);
            }
          },
        });
      } else {
        if (img.sourceUrl.startsWith('blob:')) {
          URL.revokeObjectURL(img.sourceUrl);
        }
        this.images.update(curr => curr.filter(i => i.clientId !== imageId));
        if (this.focusedImageId() === imageId) {
          this.updateFocusAfterDelete();
        }
      }
    });
  }

  private updateFocusAfterDelete() {
    const remaining = this.images();
    if (remaining.length > 0) {
      this.focusedImageId.set(remaining[0].clientId);
    } else {
      this.focusedImageId.set(null);
    }
  }

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
      this.loadedJourney = j;
      this.version.set(j.version);
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
      this.loadImages();
    });
  }

  private loadImages() {
    if (!this.journeyId) { return; }
    this.fileService.getJourneyImages(this.journeyId).subscribe(res => {
      if (!res.data) { return; }
      const items: JourneyImageItem[] = res.data.map(mf => ({
        clientId: 'srv_' + mf.id,
        serverId: mf.id,
        sourceUrl: mf.url.startsWith('http') ? mf.url : `${environment.apiBase}${mf.url}`,
        fileName: mf.originalName,
        status: 'uploaded' as const,
      }));
      this.images.set(items);
      if (items.length > 0) {
        this.focusedImageId.set(items[0].clientId);
      }
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

  private uploadImages(journeyId: number, items: JourneyImageItem[]) {
    const files = items.map(i => i.file!).filter(Boolean);
    for (const item of items) {
      this.images.update(curr =>
        curr.map(i => i.clientId === item.clientId ? {...i, status: 'uploading' as const} : i)
      );
    }
    return this.fileService.uploadFiles(journeyId, files);
  }

  save() {
    if (this.saving()) { return; }
    this.topError.set(false);
    this.errors.set({});
    this.uploadError.set(null);

    if (!this.validate()) { return; }

    this.saving.set(true);

    const request: JourneyRequest = {
      version: this.version(),
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

    const localImages = this.images().filter(i => i.status === 'local' && i.file);

    if (this.mode === 'create') {
      this.journeyService.createJourney(request).subscribe({
        next: (res) => {
          const journeyId = res.data?.id;
          if (journeyId && localImages.length > 0) {
            this.uploadImages(journeyId, localImages).subscribe({
              next: (uploadRes) => {
                if (uploadRes.data) {
                  this.images.update(curr =>
                    curr.map(i => {
                      const uploaded = uploadRes.data!.find(mf => mf.originalName === i.fileName);
                      return uploaded ? {...i, serverId: uploaded.id, status: 'uploaded' as const, file: undefined} : i;
                    })
                  );
                }
                this.saving.set(false);
                this.router.navigate(['/journeys']);
              },
              error: (err) => {
                this.uploadError.set(err.error?.message ?? 'Image upload failed. Please check file sizes and try again.');
                this.images.update(curr =>
                  curr.map(i => i.status === 'uploading' ? {...i, status: 'failed' as const} : i)
                );
                this.saving.set(false);
              },
            });
          } else {
            this.saving.set(false);
            this.router.navigate(['/journeys']);
          }
        },
        error: () => {
          this.saving.set(false);
        },
      });
    } else {
      const doUpdate = () => {
        this.journeyService.updateJourney(this.loadedJourney!, request).subscribe({
          next: () => {
            this.saving.set(false);
            this.router.navigate(['/journeys']);
          },
          error: () => {
            this.saving.set(false);
          },
        });
      };

      if (localImages.length > 0) {
        this.uploadImages(this.journeyId!, localImages).subscribe({
          next: (uploadRes) => {
            if (uploadRes.data) {
              this.images.update(curr =>
                curr.map(i => {
                  const uploaded = uploadRes.data!.find(mf => mf.originalName === i.fileName);
                  return uploaded ? {...i, serverId: uploaded.id, status: 'uploaded' as const, file: undefined} : i;
                })
              );
            }
            doUpdate();
          },
          error: (err) => {
            this.uploadError.set(err.error?.message ?? 'Image upload failed. Please check file sizes and try again.');
            this.images.update(curr =>
              curr.map(i => i.status === 'uploading' ? {...i, status: 'failed' as const} : i)
            );
            this.saving.set(false);
          },
        });
      } else {
        doUpdate();
      }
    }
  }

  discard() {
    this.router.navigate(['/journeys']);
  }

  onNewJourney() {
    this.router.navigate(['/journeys/new']);
  }
}
