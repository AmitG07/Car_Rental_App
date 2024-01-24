import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAgreementEditComponent } from './customer-agreement-edit.component';

describe('CustomerAgreementEditComponent', () => {
  let component: CustomerAgreementEditComponent;
  let fixture: ComponentFixture<CustomerAgreementEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAgreementEditComponent]
    });
    fixture = TestBed.createComponent(CustomerAgreementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
