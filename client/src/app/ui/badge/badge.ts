import { Component, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.html',
  styles: `
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 26px;
      padding: 0 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      line-height: 1;
    }
  `,
})
export class Badge {
  readonly color = input('#1976d2');
}
