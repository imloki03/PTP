import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader, provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { errorInterceptor } from './services/error-interceptor';
import { PaginatorI18nService } from './services/paginator-i18n.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor])),
    { provide: MatPaginatorIntl, useClass: PaginatorI18nService },
    provideTranslateHttpLoader({ prefix: './assets/i18n/', suffix: '.json' }),
    provideTranslateService({ loader: TranslateHttpLoader, lang: 'en' }),
  ],
};
