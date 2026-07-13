import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatInput } from '@angular/material/input';

@Component({
  selector: 'app-input',
  imports: [FormsModule, MatFormField, MatLabel, MatInput],
  templateUrl: './input.html',
})
export class Input {
  readonly label = input('');
  readonly placeholder = input('');
  readonly type = input('text');
  readonly value = model<string | number>('');
}
