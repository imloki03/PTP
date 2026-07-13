import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-button',
  imports: [NgClass, MatButton],
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
})
export class Button {
  readonly disabled = input(false);
  readonly variant = input<'primary' | 'mint' | 'danger' | 'outline'>('primary');
  readonly onClick = output<void>();
}
