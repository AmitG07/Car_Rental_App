import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCarComponent } from './customer-car.component';

describe('CustomerCarComponent', () => {
  let component: CustomerCarComponent;
  let fixture: ComponentFixture<CustomerCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerCarComponent]
    });
    fixture = TestBed.createComponent(CustomerCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
