import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-error-page',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './error-page.html',
  styleUrls: ['./error-page.css'],
})
export class ErrorPage {
}
