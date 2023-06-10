import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMealComponent } from './display-meal.component';

describe('DisplayMealComponent', () => {
  let component: DisplayMealComponent;
  let fixture: ComponentFixture<DisplayMealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayMealComponent]
    });
    fixture = TestBed.createComponent(DisplayMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
