import {Injectable, signal} from '@angular/core';
import type {JourneyFilter} from '../models/journey-filter';

@Injectable({providedIn: 'root'})
export class JourneyFilterStateService {
  readonly filter = signal<JourneyFilter>({});
}
