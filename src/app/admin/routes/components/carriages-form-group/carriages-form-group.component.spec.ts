import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriagesFormGroupComponent } from './carriages-form-group.component';

describe('CarriagesFormGroupComponent', () => {
  let component: CarriagesFormGroupComponent;
  let fixture: ComponentFixture<CarriagesFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriagesFormGroupComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CarriagesFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
