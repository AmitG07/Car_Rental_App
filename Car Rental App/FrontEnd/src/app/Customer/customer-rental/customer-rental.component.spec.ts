import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRentalComponent } from './customer-rental.component';

describe('CustomerRentalComponent', () => {
  let component: CustomerRentalComponent;
  let fixture: ComponentFixture<CustomerRentalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerRentalComponent]
    });
    fixture = TestBed.createComponent(CustomerRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
