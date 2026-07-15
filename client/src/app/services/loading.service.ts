import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoadingService {
  readonly loading = signal(false);
  private pending = 0;

  requestStarted() {
    this.pending++;
    this.loading.set(true);
  }

  requestFinished() {
    this.pending--;
    if (this.pending <= 0) {
      this.pending = 0;
      this.loading.set(false);
    }
  }
}
