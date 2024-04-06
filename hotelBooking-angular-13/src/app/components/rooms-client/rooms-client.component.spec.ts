import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsClientComponent } from './rooms-client.component';

describe('RoomsClientComponent', () => {
  let component: RoomsClientComponent;
  let fixture: ComponentFixture<RoomsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
