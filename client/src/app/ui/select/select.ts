import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-select',
  imports: [FormsModule, MatFormField, MatLabel, MatSelect, MatOption],
  templateUrl: './select.html',
})
export class Select {
  readonly label = input('');
  readonly placeholder = input('');
  readonly options = input<{ value: string | number; label: string }[]>([]);
  readonly selected = model<string | number>('');
  readonly selectionChange = output<string | number>();
}
