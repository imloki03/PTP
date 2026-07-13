import { Component, inject, input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import type { JourneyStatus } from '../../models/journey-status';

const STATUS_STYLES: Record<JourneyStatus, { bg: string; text: string }> = {
  PLANNING: { bg: '#e8f5e9', text: '#2e7d32' },
  IN_PROGRESS: { bg: '#fff8e1', text: '#f57f17' },
  FINISHED: { bg: '#e3f2fd', text: '#1565c0' },
};

@Component({
  selector: 'app-journey-status-badge',
  imports: [],
  template: `
    <span class="status-badge" [style.background]="statusColor" [style.color]="statusTextColor">
      {{ statusLabel }}
    </span>
  `,
  styles: `
    .status-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 26px;
      padding: 0 14px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      line-height: 1;
    }
  `,
})
export class JourneyStatusBadge {
  private readonly translate = inject(TranslateService);
  readonly status = input.required<JourneyStatus>();

  get statusColor(): string {
    return STATUS_STYLES[this.status()].bg;
  }

  get statusTextColor(): string {
    return STATUS_STYLES[this.status()].text;
  }

  get statusLabel(): string {
    return this.translate.instant('status.' + this.status());
  }
}
