import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHouseComponent } from './add-house.component';

describe('AddHouseComponent', () => {
  let component: AddHouseComponent;
  let fixture: ComponentFixture<AddHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
