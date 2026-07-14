import {inject} from '@angular/core';
import type {HttpInterceptorFn} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 0 || err.status >= 500) {
          router.navigate(['/error']);
        }
      }
      return throwError(() => err);
    }),
  );
};
