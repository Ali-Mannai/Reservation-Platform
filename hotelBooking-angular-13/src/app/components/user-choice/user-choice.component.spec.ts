import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChoiceComponent } from './user-choice.component';

describe('UserChoiceComponent', () => {
  let component: UserChoiceComponent;
  let fixture: ComponentFixture<UserChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
