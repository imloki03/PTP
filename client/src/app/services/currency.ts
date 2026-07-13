import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import type { ApiResponse } from '../models/api-response';
import type { Currency } from '../models/currency';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBase}/api/currencies`;

  getCurrencies(): Observable<ApiResponse<Currency[]>> {
    return this.http.get<ApiResponse<Currency[]>>(this.baseUrl);
  }
}
