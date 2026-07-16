import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import type {Observable} from 'rxjs';
import type {ApiResponse} from '../models/api-response';
import type {Journey} from '../models/journey';
import type {JourneyFilter} from '../models/journey-filter';
import type {JourneyRequest} from '../models/journey-request';
import type {PagedResponse} from '../models/paged-response';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class JourneyService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBase}/api/journeys`;

  searchJourneys(page = 0, size = 5, filter?: JourneyFilter): Observable<ApiResponse<PagedResponse<Journey>>> {
    return this.http.post<ApiResponse<PagedResponse<Journey>>>(`${this.baseUrl}/search`, filter ?? {}, {
      params: { page, size },
    });
  }

  getJourney(id: number): Observable<ApiResponse<Journey>> {
    return this.http.get<ApiResponse<Journey>>(`${this.baseUrl}/${id}`);
  }

  createJourney(request: JourneyRequest): Observable<ApiResponse<Journey>> {
    return this.http.post<ApiResponse<Journey>>(this.baseUrl, request);
  }

  private selfHref(journey: Journey): string {
    return journey.links.find(l => l.rel === 'self')!.href;
  }

  updateJourney(journey: Journey, request: JourneyRequest): Observable<ApiResponse<Journey>> {
    return this.http.put<ApiResponse<Journey>>(this.selfHref(journey), request);
  }

  deleteJourney(journey: Journey): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(this.selfHref(journey));
  }

  deleteJourneys(ids: number[]): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}`, { body: ids });
  }
}
