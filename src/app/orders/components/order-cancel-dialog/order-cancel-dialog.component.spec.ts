import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCancelDialogComponent } from './order-cancel-dialog.component';

describe('OrderCancelDialogComponent', () => {
  let component: OrderCancelDialogComponent;
  let fixture: ComponentFixture<OrderCancelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCancelDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderCancelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
