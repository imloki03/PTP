import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { JourneyStatusBadge } from './journey-status-badge';

describe('JourneyStatusBadge', () => {
  let component: JourneyStatusBadge;
  let fixture: ComponentFixture<JourneyStatusBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JourneyStatusBadge],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(JourneyStatusBadge);
    fixture.componentRef.setInput('status', 'PLANNING');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
