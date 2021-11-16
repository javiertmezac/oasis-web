import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentEditComponent } from '../payment-edit/payment-edit.component'

describe('PaymentEditComponent', () => {
  let component: PaymentEditComponent;
  let fixture: ComponentFixture<PaymentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
