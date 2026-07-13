import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslateService, TranslatePipe} from '@ngx-translate/core';
import {Button} from '../../ui/button/button';
import {JourneySearchPanel} from '../../components/journey-search-panel/journey-search-panel';
import {JourneyTable} from '../../components/journey-table/journey-table';
import type {PageEvent} from '@angular/material/paginator';
import type {Journey} from '../../models/journey';
import type {Country} from '../../models/country';
import type {Currency} from '../../models/currency';
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
  protected readonly translate = inject(TranslateService);

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  countries: Country[] = [];
  currencies: Currency[] = [];
  journeys: Journey[] = [];
  totalElements = 0;
  pageSize = 5;
  page = 0;
  selectedIds: number[] = [];

  ngOnInit() {
    this.loadJourneys();
  }

  get allSelected(): boolean {
    return this.journeys.length > 0 && this.selectedIds.length === this.journeys.length;
  }

  loadJourneys() {
    this.journeyService.getJourneys(this.page, this.pageSize).subscribe((res) => {
      if (!res.data) { return; }
      this.journeys = res.data.content;
      this.totalElements = res.data.totalElements;
      this.selectedIds = [];
    });
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadJourneys();
  }

  onNewJourney() {
    // TODO: navigate to create page
  }

  onSearch() {
    this.page = 0;
    this.loadJourneys();
  }

  onReset() {
    this.page = 0;
    this.loadJourneys();
  }

  onToggleAll() {
    if (this.allSelected) {
      this.selectedIds = [];
    } else {
      this.selectedIds = this.journeys.map((j) => j.id);
    }
  }

  onToggleRow(id: number) {
    const idx = this.selectedIds.indexOf(id);
    if (idx >= 0) {
      this.selectedIds.splice(idx, 1);
    } else {
      this.selectedIds.push(id);
    }
  }

  onEdit(id: number) {
    // TODO: navigate to edit page
  }

  onDelete(id: number) {
    this.journeyService.deleteJourney(id).subscribe(() => this.loadJourneys());
  }

  onDeleteSelected() {
    const ids = [...this.selectedIds];
    let completed = 0;
    ids.forEach((id) => {
      this.journeyService.deleteJourney(id).subscribe(() => {
        completed++;
        if (completed === ids.length) {
          this.loadJourneys();
        }
      });
    });
  }
}
