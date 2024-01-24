import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../Services/alert.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../Services/api.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.css']
})
export class AgreementsComponent implements OnInit {

  username: any;
  totalPrice: any;
  agreementData: any;
  isAvailable: any;
  totalDays: any;
  userId: number;
  returnData: any;
  startDateValue: any;
  endDateValue: any;

  constructor(
    private service: APIService,
    private _alert: AlertService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    //this.calculateTotal();
    this.auth.GetCustomerSession().subscribe((res) => {
      this.userId = this.auth.GetId();
    });
    console.log(this.userId, 'user');
    this.listAgreements();
  }

  listAgreements() {
    this.service.GetAllRents().subscribe((res) => {
      this.agreementData = res;
      console.log(this.agreementData, 'agreement');
      this.processAgreementData();
    });
  }

  processAgreementData() {
    if (this.agreementData && this.agreementData.length > 0) {
      this.agreementData.forEach((obj) => {
        // this.calculateTotal();
        this.startDateValue = this.formatDate(obj.startDate);
        this.endDateValue = this.formatDate(obj.endDate);
        console.log(this.startDateValue);
        this.service.GetAvailableStatus(obj.carId).subscribe(
          (res) => {
            console.log(obj.carId);
            this.isAvailable = res;
          },
          (error) => {
            console.log(error.message);
          }
        );
      });
    }
  }

  formatDate(date: any) {
    console.log(date.toString().split('T')[0]);
    const arr = date.toString().split('T')[0].split('-');
    return date.toString().split('T')[0];
  }

  onReturn(id: any) {
    console.log(id, 'deleteid==>');
    this.service.DeleteRent(id, this.userId).subscribe((res) => {
      console.log('res==>', res);
      this.listAgreements();
    });
  }

  onClickDelete(id: any) {
    console.log(id, 'deleteid==>');
    console.log("User id", this.userId);
    this.service.DeleteRent(id, this.userId).subscribe((res) => {
      console.log('res==>', res);
      this.listAgreements();
    });
  }
}
