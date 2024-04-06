import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInnComponent } from './edit-inn.component';

describe('EditInnComponent', () => {
  let component: EditInnComponent;
  let fixture: ComponentFixture<EditInnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
