import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLoadingComponent } from './payment-loading.component';

describe('PaymentLoadingComponent', () => {
  let component: PaymentLoadingComponent;
  let fixture: ComponentFixture<PaymentLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
