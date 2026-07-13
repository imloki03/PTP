import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { JourneyTable } from './journey-table';

describe('JourneyTable', () => {
  let component: JourneyTable;
  let fixture: ComponentFixture<JourneyTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JourneyTable],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(JourneyTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
