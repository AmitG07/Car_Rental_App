import { Component, OnInit } from '@angular/core';
import { APIService } from '../../Services/api.service';
import { AlertService } from 'src/app/Services/alert.service';
import { AuthService } from 'src/app/Services/auth.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-customer-agreement',
  templateUrl: './customer-agreement.component.html',
  styleUrls: ['./customer-agreement.component.css']
})
export class CustomerAgreementComponent implements OnInit {

  Agreements: any[];
  userId: string | null;
  rentId: any;
  isAvailable: any;
  returnRequest: boolean = false;
  acceptobj: any;
  requestobj: any;
  startDateValue: any;
  endDateValue: any;

  constructor(
    private service: APIService,
    private _alert: AlertService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.GetId(); // Replace with the actual method or property name
    console.log('User ID:', this.userId);
    this.LoadListData();
  }

  LoadListData() {
    this.service.GetAllRents().subscribe((response: any[]) => {
      // Filter agreements for the logged-in user
      this.Agreements = response.filter(agreement => agreement.userId === this.userId);
      console.log("Agreements in component:", this.Agreements);
      this.processRentalData();
    });
  }

  formatDate(date: any) {
    console.log(date.toString().split('T')[0]);
    const arr = date.toString().split('T')[0].split('-');
    //this.startDateValue=date.toString().split("T")[0];
    return date.toString().split('T')[0];
  }

  processRentalData() {
    if (this.Agreements && this.Agreements.length > 0) {
      this.Agreements.forEach((obj) => {
        this.startDateValue = this.formatDate(obj.startDate);
        this.endDateValue = this.formatDate(obj.endDate);
        console.log(obj.isAccepted, 'isAccepted');
        this.service.GetAvailableStatus(obj.carId).subscribe(
          (res) => {
            this.rentId = obj.rentId;
            //console.log(this.rentId,"rentId");
            this.isAvailable = res;
          },
          (error) => {
            console.log(error.message);
          }
        );
      });
    }
  }

  onAccept(id: any) {
    // this.isAccepted=true;
    this.service.GetOneRentalAgreement(id).subscribe((res) => {
      this.service.GetAvailableStatus(res.carId).subscribe((val) => {
        if (val == true) {
          this.acceptobj = res;
          this.acceptobj.isAccepted = true;
          // this.isAccepted=this.acceptobj.isAccepted ;
          const body = { ...this.acceptobj, userId: this.userId };
          console.log(body, 'acceptobj'); //

          this.service.EditRentalAgreement(id, body).subscribe({
            next: (val: any) => {
              alert('Click OK to accept Terms and Conditions');
              this._alert.openSnackBar('Agreement Accepted'); //
              this.LoadListData();
            },
            error: (err: any) => {
              console.log(err.error.message);
            },
          });
        }
        else {
          this._alert.openSnackBar("Unfortunately car is already booked");
        }
      })
    });
  }

  onRequestReturn(id: any) {
    this.service.GetOneRentalAgreement(id).subscribe((res) => {
      this.requestobj = res;
      this.requestobj.returnRequest = true;
      this.returnRequest = this.requestobj.returnReq;
      const body = { ...this.requestobj, userId: this.userId };
      console.log(body, 'requestobj'); //

      // console.log(this.requestobj,"returned");
      this.service.EditRentalAgreement(id, body).subscribe({
        next: (val: any) => {
          this._alert.openSnackBar('Request Sent');
          this.LoadListData();
        },
        error: (err: any) => {
          console.log(err.error.message);
        },
      });
    });
  }

  onClickDelete(id: any) {
    console.log(id, 'deleteid==>');
    console.log("User id", this.userId);
    this.service.DeleteRent(id, this.userId).subscribe((res) => {
      console.log('res==>', res);
      this.LoadListData();
    });
  }
}

