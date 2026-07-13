import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import type { ApiResponse } from '../models/api-response';
import type { Journey } from '../models/journey';
import type { JourneyRequest } from '../models/journey-request';
import type { PagedResponse } from '../models/paged-response';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class JourneyService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBase}/api/journeys`;

  getJourneys(page = 0, size = 5): Observable<ApiResponse<PagedResponse<Journey>>> {
    return this.http.get<ApiResponse<PagedResponse<Journey>>>(this.baseUrl, {
      params: { page, size },
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
