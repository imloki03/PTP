import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-icon-button',
  imports: [NgClass, MatIconButton, MatIcon, MatTooltip],
  templateUrl: './icon-button.html',
  styleUrls: ['./icon-button.css'],
})
export class IconButton {
  readonly icon = input.required<string>();
  readonly tooltip = input('');
  readonly disabled = input(false);
  readonly variant = input<'flat' | 'outline'>('flat');
  readonly onClick = output<void>();
}
