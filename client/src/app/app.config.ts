import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader, provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { errorInterceptor } from './config/error-interceptor';
import { langInterceptor } from './config/lang-interceptor';
import { snackbarInterceptor } from './config/snackbar-interceptor';
import { PaginatorI18nService } from './services/paginator-i18n.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor, langInterceptor, snackbarInterceptor])),
    { provide: MatPaginatorIntl, useClass: PaginatorI18nService },
    provideTranslateHttpLoader({ prefix: './assets/i18n/', suffix: '.json' }),
    provideTranslateService({ loader: TranslateHttpLoader, lang: 'en' }),
  ],
};
