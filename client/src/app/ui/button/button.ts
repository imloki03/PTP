import {NgClass} from '@angular/common';
import {Component, input, output} from '@angular/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-button',
  imports: [NgClass, MatButton],
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
})
export class Button {
  readonly disabled = input(false);
  readonly variant = input<'primary' | 'mint' | 'danger' | 'outline' | 'success'>('primary');
  readonly width = input<string>();
  readonly height = input<string>();
  readonly state = input<'default' | 'loading' | 'success' | 'error'>('default');
  readonly onClick = output<void>();
}
