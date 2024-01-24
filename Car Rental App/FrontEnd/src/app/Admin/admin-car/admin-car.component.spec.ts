import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarComponent } from './admin-car.component';

describe('AdminCarComponent', () => {
  let component: AdminCarComponent;
  let fixture: ComponentFixture<AdminCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCarComponent]
    });
    fixture = TestBed.createComponent(AdminCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
