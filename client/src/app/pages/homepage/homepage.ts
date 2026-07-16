import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Button} from '../../ui/button/button';
import {ConfirmDialog} from '../../ui/confirm-dialog/confirm-dialog';
import {PageLayout} from '../page-layout/page-layout';
import {JourneySearchPanel} from '../../components/journey-search-panel/journey-search-panel';
import {JourneyTable} from '../../components/journey-table/journey-table';
import type {PageEvent} from '@angular/material/paginator';
import type {Journey} from '../../models/journey';
import type {JourneyFilter} from '../../models/journey-filter';
import {JourneyFilterStateService} from '../../services/journey-filter-state';
import {JourneyService} from '../../services/journey';

@Component({
  selector: 'app-homepage',
  imports: [
    RouterLink, Button, TranslatePipe,
    PageLayout, JourneySearchPanel, JourneyTable,
  ],
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css'],
})
export class Homepage implements OnInit {
  private readonly router = inject(Router);
  private readonly journeyService = inject(JourneyService);
  private readonly filterState = inject(JourneyFilterStateService);
  private readonly dialog = inject(MatDialog);
  protected readonly translate = inject(TranslateService);

  journeys = signal<Journey[]>([]);
  totalElements = signal(0);
  pageSize = signal(5);
  page = signal(0);
  selectedIds = signal<number[]>([]);

  ngOnInit() {
    this.loadJourneys();
  }

  protected readonly initialFilter = this.filterState.filter.asReadonly();

  get allSelected(): boolean {
    return this.journeys().length > 0 && this.selectedIds().length === this.journeys().length;
  }

  loadJourneys() {
    this.journeyService.searchJourneys(this.page(), this.pageSize(), this.filterState.filter()).subscribe((res) => {
      if (!res.data) { return; }
      this.journeys.set(res.data.content);
      this.totalElements.set(res.data.totalElements);
      this.selectedIds.set([]);
    });
  }

  onPageChange(event: PageEvent) {
    this.page.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadJourneys();
  }

  onNewJourney() {
    this.router.navigate(['/journeys/new']);
  }

  onSearch(filter: JourneyFilter) {
    this.filterState.filter.set(filter);
    this.page.set(0);
    this.loadJourneys();
  }

  onReset() {
    this.filterState.filter.set({});
    this.page.set(0);
    this.loadJourneys();
  }

  onToggleAll() {
    if (this.allSelected) {
      this.selectedIds.set([]);
    } else {
      this.selectedIds.set(this.journeys().map((j) => j.id));
    }
  }

  onToggleRow(id: number) {
    this.selectedIds.update((prev) => {
      const idx = prev.indexOf(id);
      if (idx >= 0) {
        return prev.filter((v) => v !== id);
      } else {
        return [...prev, id];
      }
    });
  }

  onEdit(id: number) {
    this.router.navigate(['/journeys', id, 'edit']);
  }

  onDelete(id: number) {
    const journey = this.journeys().find((j) => j.id === id);
    if (!journey) { return; }
    this.dialog.open(ConfirmDialog, {
      data: this.translate.instant('dialog.confirmDelete'),
    }).afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.journeyService.deleteJourney(journey).subscribe(() => this.loadJourneys());
      }
    });
  }

  onDeleteSelected() {
    const ids = this.selectedIds();
    if (ids.length === 0) { return; }
    this.dialog.open(ConfirmDialog, {
      data: this.translate.instant('dialog.confirmDelete'),
    }).afterClosed().subscribe((confirmed) => {
      if (!confirmed) { return; }
      this.journeyService.deleteJourneys(ids).subscribe(() => {
        this.selectedIds.set([]);
        this.loadJourneys();
      });
    });
  }
}
