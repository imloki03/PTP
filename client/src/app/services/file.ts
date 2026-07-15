import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import type {Observable} from 'rxjs';
import type {ApiResponse} from '../models/api-response';
import type {MediaFile} from '../models/media-file';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class FileService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBase}/api/files`;

  uploadFiles(journeyId: number, files: File[]): Observable<ApiResponse<MediaFile[]>> {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }
    return this.http.post<ApiResponse<MediaFile[]>>(`${this.baseUrl}/upload?journeyId=${journeyId}`, formData);
  }

  getJourneyImages(journeyId: number): Observable<ApiResponse<MediaFile[]>> {
    return this.http.get<ApiResponse<MediaFile[]>>(`${this.baseUrl}/journey/${journeyId}`);
  }

  deleteImage(imageId: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${imageId}`);
  }
}
