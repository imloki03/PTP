import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { JourneyRow } from './journey-row';
import type { Journey } from '../../models/journey';

describe('JourneyRow', () => {
  let component: JourneyRow;
  let fixture: ComponentFixture<JourneyRow>;

  const mockJourney: Journey = {
    id: 1, version: 0, name: 'Test', description: 'Desc',
    country: { id: 1, code: 'VN', name: 'Vietnam', places: [] },
    place: { id: 1, name: 'Hanoi' },
    startDate: '2020-09-09', endDate: '2020-09-09',
    currency: { id: 1, code: 'VND', name: 'Vietnamese Dong' },
    amount: 1000000, durationDay: 1, durationNight: 0,
    status: 'PLANNING',
    _links: { self: { href: '/api/journeys/1' } },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JourneyRow],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(JourneyRow);
    fixture.componentRef.setInput('journey', mockJourney);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
