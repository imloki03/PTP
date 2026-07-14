import {inject, Injectable} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class PaginatorI18nService extends MatPaginatorIntl {
  private readonly translate = inject(TranslateService);

  constructor() {
    super();
    this.translate.onTranslationChange.subscribe(() => this.updateLabels());
    this.updateLabels();
  }

  private updateLabels() {
    this.itemsPerPageLabel = this.translate.instant('pagination.itemsPerPage');
    this.nextPageLabel = this.translate.instant('pagination.nextPage');
    this.previousPageLabel = this.translate.instant('pagination.previousPage');
    this.firstPageLabel = this.translate.instant('pagination.firstPage');
    this.lastPageLabel = this.translate.instant('pagination.lastPage');
    this.changes.next();
  }

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0) { return this.translate.instant('pagination.empty'); }
    const start = page * pageSize + 1;
    const end = Math.min((page + 1) * pageSize, length);
    return this.translate.instant('pagination.showing', { start, end, total: length });
  };
}
