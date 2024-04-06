import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHotelComponent } from './delete-hotel.component';

describe('DeleteHotelComponent', () => {
  let component: DeleteHotelComponent;
  let fixture: ComponentFixture<DeleteHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
