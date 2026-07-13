import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatInput } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-date-picker',
  imports: [FormsModule, MatFormField, MatLabel, MatInput],
  providers: [provideNativeDateAdapter()],
  templateUrl: './date-picker.html',
})
export class DatePicker {
  readonly label = input('');
  readonly placeholder = input('');
  readonly value = model('');
}
