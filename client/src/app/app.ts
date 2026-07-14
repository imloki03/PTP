import {ApplicationRef, Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  constructor() {
    const translate = inject(TranslateService);
    const appRef = inject(ApplicationRef);
    translate.onTranslationChange.subscribe(() => appRef.tick());
  }
}
