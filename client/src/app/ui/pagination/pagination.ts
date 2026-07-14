import {Component, input, output} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  imports: [MatPaginator],
  templateUrl: './pagination.html',
})
export class Pagination {
  readonly totalElements = input(0);
  readonly pageSize = input(5);
  readonly pageIndex = input(0);
  readonly onPageChange = output<PageEvent>();

  get startEntry(): number { return this.totalElements() > 0 ? this.pageIndex() * this.pageSize() + 1 : 0; }
  get endEntry(): number { return Math.min((this.pageIndex() + 1) * this.pageSize(), this.totalElements()); }
}
