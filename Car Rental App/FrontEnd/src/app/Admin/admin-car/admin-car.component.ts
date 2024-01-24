import { Component, OnInit } from '@angular/core';
import { APIService } from '../../Services/api.service';
import { ChangeDetectorRef } from '@angular/core';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-admin-car',
  templateUrl: './admin-car.component.html',
  styleUrls: ['./admin-car.component.css']
})

export class AdminCarComponent implements OnInit {

  Cars: any;

  constructor(
    private service: APIService,
    private _alert: AlertService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.LoadListData();
  }

  LoadListData() {
    this.service.GetAllCars().subscribe(response => {
      this.Cars = response;
      console.log("Cars in component:", this.Cars);
      this.cdRef.detectChanges();
    });
  }

  onClickDelete(id: any) {
    this.service.DeleteCar(id).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res == true) {
          this.LoadListData();
          this._alert.openSnackBar('Deleted Successfully');
        }
        else {
          this._alert.openSnackBar('Cannot Delete');
        }
      },
      error: (err: any) => {
        console.log(err);
        this._alert.openSnackBar('Error Occured !!');
      }
    })
  }
}
