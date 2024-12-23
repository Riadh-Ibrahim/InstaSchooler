import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstudentComponent } from './addstudent.component';

describe('AddstudentComponent', () => {
  let component: AddstudentComponent;
  let fixture: ComponentFixture<AddstudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddstudentComponent]
    });
    fixture = TestBed.createComponent(AddstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
