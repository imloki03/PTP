import {inject} from '@angular/core';
import type {HttpInterceptorFn} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

export const langInterceptor: HttpInterceptorFn = (req, next) => {
  // skip translation file requests to avoid circular dependency (TranslateService → HttpClient → interceptor → TranslateService)
  if (req.url.includes('/assets/i18n/')) {
    return next(req);
  }

  const translate = inject(TranslateService);
  const lang = translate.currentLang() || 'en';

  const cloned = req.clone({
    setHeaders: {
      'Accept-Language': lang,
    },
  });

  return next(cloned);
};
