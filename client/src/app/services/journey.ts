import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import type { ApiResponse } from '../models/api-response';
import type { Journey } from '../models/journey';
import type { JourneyFilter } from '../models/journey-filter';
import type { JourneyRequest } from '../models/journey-request';
import type { PagedResponse } from '../models/paged-response';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class JourneyService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBase}/api/journeys`;

  getJourneys(page = 0, size = 5, filter?: JourneyFilter): Observable<ApiResponse<PagedResponse<Journey>>> {
    let params: Record<string, string | number | boolean> = { page, size };
    if (filter) {
      if (filter.searchQuery) { params['searchQuery'] = filter.searchQuery; }
      if (filter.countryId) { params['countryId'] = filter.countryId; }
      if (filter.currencyId) { params['currencyId'] = filter.currencyId; }
      if (filter.status) { params['status'] = filter.status; }
      if (filter.amountFrom) { params['amountFrom'] = filter.amountFrom; }
      if (filter.amountTo) { params['amountTo'] = filter.amountTo; }
      if (filter.startDateFrom) { params['startDateFrom'] = filter.startDateFrom; }
      if (filter.startDateTo) { params['startDateTo'] = filter.startDateTo; }
      if (filter.endDateFrom) { params['endDateFrom'] = filter.endDateFrom; }
      if (filter.endDateTo) { params['endDateTo'] = filter.endDateTo; }
    }
    return this.http.get<ApiResponse<PagedResponse<Journey>>>(this.baseUrl, {
      params,
    });
  }

  getJourney(id: number): Observable<ApiResponse<Journey>> {
    return this.http.get<ApiResponse<Journey>>(`${this.baseUrl}/${id}`);
  }

  createJourney(request: JourneyRequest): Observable<ApiResponse<Journey>> {
    return this.http.post<ApiResponse<Journey>>(this.baseUrl, request);
  }

  updateJourney(id: number, request: JourneyRequest): Observable<ApiResponse<Journey>> {
    return this.http.put<ApiResponse<Journey>>(`${this.baseUrl}/${id}`, request);
  }

  deleteJourney(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`);
  }
}
