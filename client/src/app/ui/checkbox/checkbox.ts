import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox',
  imports: [FormsModule, MatCheckbox],
  templateUrl: './checkbox.html',
})
export class Checkbox {
  readonly label = input('');
  readonly disabled = input(false);
  readonly checked = model(false);
}
