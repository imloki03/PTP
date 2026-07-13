import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule, MatFormField, MatLabel, MatInput, MatIcon],
  templateUrl: './search-input.html',
})
export class SearchInput {
  readonly placeholder = 'Search by Name, Description';
  readonly query = model('');
}
