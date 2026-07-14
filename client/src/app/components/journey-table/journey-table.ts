import {Component, input, output} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {Checkbox} from '../../ui/checkbox/checkbox';
import {JourneyRow} from '../journey-row/journey-row';
import {Pagination} from '../../ui/pagination/pagination';
import {Button} from '../../ui/button/button';
import type {Journey} from '../../models/journey';
import type {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-journey-table',
  imports: [TranslatePipe, Checkbox, JourneyRow, Pagination, Button],
  templateUrl: './journey-table.html',
  styleUrls: ['./journey-table.css'],
})
export class JourneyTable {
  readonly journeys = input<Journey[]>([]);
  readonly totalElements = input(0);
  readonly pageSize = input(5);
  readonly pageIndex = input(0);
  readonly selectedIds = input<number[]>([]);
  readonly allSelected = input(false);
  readonly toggleAll = output<void>();
  readonly toggleRow = output<number>();
  readonly edit = output<number>();
  readonly delete = output<number>();
  readonly deleteSelected = output<void>();
  readonly onPageChange = output<PageEvent>();
}
