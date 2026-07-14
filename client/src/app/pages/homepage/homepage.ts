import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Button} from '../../ui/button/button';
import {ConfirmDialog} from '../../ui/confirm-dialog/confirm-dialog';
import {JourneySearchPanel} from '../../components/journey-search-panel/journey-search-panel';
import {JourneyTable} from '../../components/journey-table/journey-table';
import type {PageEvent} from '@angular/material/paginator';
import type {Journey} from '../../models/journey';
import type {JourneyFilter} from '../../models/journey-filter';
import {JourneyService} from '../../services/journey';

@Component({
  selector: 'app-homepage',
  imports: [
    RouterLink, Button, TranslatePipe,
    JourneySearchPanel, JourneyTable,
  ],
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css'],
})
export class Homepage implements OnInit {
  private readonly journeyService = inject(JourneyService);
  private readonly dialog = inject(MatDialog);
  protected readonly translate = inject(TranslateService);

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  journeys = signal<Journey[]>([]);
  totalElements = signal(0);
  pageSize = signal(5);
  page = signal(0);
  selectedIds = signal<number[]>([]);
  filter = signal<JourneyFilter>({});

  ngOnInit() {
    this.loadJourneys();
  }

  get allSelected(): boolean {
    return this.journeys().length > 0 && this.selectedIds().length === this.journeys().length;
  }

  loadJourneys() {
    this.journeyService.searchJourneys(this.page(), this.pageSize(), this.filter()).subscribe((res) => {
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
    // TODO: navigate to create page
  }

  onSearch(filter: JourneyFilter) {
    this.filter.set(filter);
    this.page.set(0);
    this.loadJourneys();
  }

  onReset() {
    this.filter.set({});
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
    // TODO: navigate to edit page
  }

  onDelete(id: number) {
    const name = this.journeys().find((j) => j.id === id)?.name ?? '';
    this.dialog.open(ConfirmDialog, {
      data: this.translate.instant('dialog.confirmDelete'),
    }).afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.journeyService.deleteJourney(id).subscribe(() => this.loadJourneys());
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
      let completed = 0;
      ids.forEach((id) => {
        this.journeyService.deleteJourney(id).subscribe(() => {
          completed++;
          if (completed === ids.length) {
            this.loadJourneys();
          }
        });
      });
    });
  }
}
