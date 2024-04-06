import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInnsComponent } from './all-inns.component';

describe('AllInnsComponent', () => {
  let component: AllInnsComponent;
  let fixture: ComponentFixture<AllInnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllInnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
