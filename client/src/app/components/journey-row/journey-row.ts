import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';
import { Checkbox } from '../../ui/checkbox/checkbox';
import { IconButton } from '../../ui/icon-button/icon-button';
import { JourneyStatusBadge } from '../journey-status-badge/journey-status-badge';
import type { Journey } from '../../models/journey';

@Component({
  selector: '[app-journey-row]',
  imports: [NgClass, TranslatePipe, Checkbox, IconButton, JourneyStatusBadge, DatePipe, DecimalPipe, MatTooltip],
  templateUrl: './journey-row.html',
  styleUrls: ['./journey-row.css'],
})
export class JourneyRow {
  readonly journey = input.required<Journey>();
  readonly selected = input(false);
  readonly even = input(false);
  readonly toggle = output<void>();
  readonly edit = output<void>();
  readonly delete = output<void>();
}
