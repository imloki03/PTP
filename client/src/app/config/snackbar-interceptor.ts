import {inject} from '@angular/core';
import type {HttpInterceptorFn} from '@angular/common/http';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, tap, throwError} from 'rxjs';
import type {ApiResponse} from '../models/api-response';

export const snackbarInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method === 'GET') {
    return next(req);
  }

  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && event.body && typeof event.body === 'object') {
        const body = event.body as ApiResponse<unknown>;
        if (body.success && body.message) {
          snackBar.open(body.message, '', {duration: 4000, panelClass: 'app-snackbar-success', verticalPosition: 'bottom', horizontalPosition: 'right'});
        }
      }
    }),
    catchError((err) => {
      if (err instanceof HttpErrorResponse && err.status >= 400 && err.status < 500 && err.error && typeof err.error === 'object') {
        const body = err.error as ApiResponse<unknown>;
        if (body.message) {
          snackBar.open(body.message, '', {duration: 5000, panelClass: 'app-snackbar-error', verticalPosition: 'bottom', horizontalPosition: 'right'});
        }
      }
      return throwError(() => err);
    }),
  );
};
