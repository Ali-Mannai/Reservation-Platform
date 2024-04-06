import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOwnerComponent } from './display-owner.component';

describe('DisplayOwnerComponent', () => {
  let component: DisplayOwnerComponent;
  let fixture: ComponentFixture<DisplayOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
