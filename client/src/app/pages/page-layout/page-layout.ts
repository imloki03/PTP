import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatProgressBar} from '@angular/material/progress-bar';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {LoadingService} from '../../services/loading.service';

@Component({
  selector: 'app-page-layout',
  imports: [RouterLink, MatProgressBar, TranslatePipe],
  templateUrl: './page-layout.html',
  styleUrls: ['./page-layout.css'],
})
export class PageLayout {
  protected readonly loading = inject(LoadingService).loading;
  protected readonly translate = inject(TranslateService);

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
