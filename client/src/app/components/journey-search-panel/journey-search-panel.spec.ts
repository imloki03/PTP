import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { JourneySearchPanel } from './journey-search-panel';

describe('JourneySearchPanel', () => {
  let component: JourneySearchPanel;
  let fixture: ComponentFixture<JourneySearchPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JourneySearchPanel],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(JourneySearchPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
