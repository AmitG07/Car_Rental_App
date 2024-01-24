import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../Services/api.service';
import { AlertService } from '../../Services/alert.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-customer-agreement-edit',
  templateUrl: './customer-agreement-edit.component.html',
  styleUrls: ['./customer-agreement-edit.component.css']
})
export class CustomerAgreementEditComponent implements OnInit {

  rentId: any;
  userId: any;
  rentData: any;
  totalDays: number = 0;
  startDateValue: any;
  minEndDate: any = "";
  totalPrice: number = 0;
  role: any;
  Cars: any;
  EditedData: any;

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private alertservice: AlertService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private apiservice: APIService
  ) { }

  ngOnInit(): void {
    this.LoadListData();
    this.rentId = this.activatedroute.snapshot.params['id'];
    console.log(this.rentId);

    if (this.rentId) {
      this.apiservice.GetOneRentalAgreement(this.rentId).subscribe(
        {
          next: (res: any) => {
            this.rentData = res;
            console.log(res);
            this.EditedData = res;
            this.editrentdetailsForm = this.formBuilder.group({
              userId: this.authservice.GetId(),
              carId: [this.rentData.carId, [Validators.required]],
              startDate: [this.formatStartDate(res.startDate), [Validators.required]],
              endDate: [this.formatEndDate(res.endDate), [Validators.required]],
              rentedPrice: [this.rentData.rentedPrice, [Validators.required]],
            });
          },
          error: (err: any) => {
            console.error(err);
          }
        }
      )
    }
    this.authservice.GetCustomerSession().subscribe((response) => {
      this.role = this.authservice.GetCustomerRole(response);
      this.userId = this.authservice.GetId();
    })
  }

  LoadListData() {
    this.apiservice.GetAllCars().subscribe(response => {
      this.Cars = response;
    });
  }

  editrentdetailsForm = this.formBuilder.group({
    userId: this.authservice.GetId(),
    carId: ["", [Validators.required]],
    startDate: this.formBuilder.control(new Date(), [Validators.required,]),
    endDate: this.formBuilder.control(new Date(), [Validators.required,]),
    rentedPrice: [null, [Validators.required]],
  })

  formatStartDate(date: any) {
    console.log(date.toString().split("T")[0]);
    const arr = date.toString().split("T")[0].split("-");
    this.startDateValue = date.toString().split("T")[0];
    return date.toString().split("T")[0];
  }

  formatEndDate(date: any) {
    console.log(date.toString().split("T")[0]);
    const arr = date.toString().split("T")[0].split("-");
    return date.toString().split("T")[0];
  }

  calculateTotal(e) {
    const endDateModified = new Date(e.target.value);
    console.log(endDateModified);

    //Jan 1, 1970
    const Time = endDateModified.getTime() - new Date(this.startDateValue).getTime();
    console.log(endDateModified, "time-", Time);
    //in days
    this.totalDays = Math.ceil(Time / (1000 * 3600 * 24));
    console.log(this.totalDays);
    //price

    const rentedPrice = this.rentData.rentedPrice; //car price from fetched data
    console.log(rentedPrice);
    this.totalPrice = this.totalDays * rentedPrice;
  }

  onSubmit() {
    if (this.editrentdetailsForm.valid) { 
      if (this.rentId) {
        console.log(this.editrentdetailsForm.value);
        this.EditedData.endDate = this.editrentdetailsForm.value.endDate;
        this.EditedData.rentedPrice = this.totalPrice;
        console.log(this.EditedData);
        this.apiservice.EditRentalAgreement(this.rentId, this.EditedData).subscribe({
          next: (val: any) => {
            this.alertservice.openSnackBar('Updated');
            if (this.role) {
              this.router.navigate(['/admin/agreements']);
            }
            else {
              this.router.navigate([`/customer/customer-agreement/${this.rentData.userId}`]);
            }
          },
          error: (err: any) => {
            console.warn("error");
          }
        });
      }
    }
  }

  onBack() {
    if (this.role) {
      this.router.navigate([`/admin/agreements/`]);
    }
    else {
      this.router.navigate([`/customer/customer-agreement/${this.userId}`]);
    }
  }
}
