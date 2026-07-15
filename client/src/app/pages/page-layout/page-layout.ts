import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-page-layout',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './page-layout.html',
  styleUrls: ['./page-layout.css'],
})
export class PageLayout {
  protected readonly translate = inject(TranslateService);

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
