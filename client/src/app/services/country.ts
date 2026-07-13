import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import type { ApiResponse } from '../models/api-response';
import type { Country } from '../models/country';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBase}/api/countries`;

  getCountries(): Observable<ApiResponse<Country[]>> {
    return this.http.get<ApiResponse<Country[]>>(this.baseUrl);
  }
}
