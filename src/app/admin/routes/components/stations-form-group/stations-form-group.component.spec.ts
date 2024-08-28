import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsFormGroupComponent } from './stations-form-group.component';

describe('StationsFormGroupComponent', () => {
  let component: StationsFormGroupComponent;
  let fixture: ComponentFixture<StationsFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationsFormGroupComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StationsFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
