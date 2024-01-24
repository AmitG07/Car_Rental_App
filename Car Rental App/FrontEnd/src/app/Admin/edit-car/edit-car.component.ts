import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../Services/api.service';
import { AlertService } from '../../Services/alert.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  EditCarForm: FormGroup;
  car: any;
  carId: number | null = null;

  constructor(
    private builder: FormBuilder,
    private _alert: AlertService,
    private router: Router,
    private service: APIService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.EditCarForm = this.builder.group({
      VehicleId: [this.car.VehicleId, [Validators.required, Validators.maxLength(10)]],
      Brand: [this.car.Brand, [Validators.required, Validators.maxLength(20)]],
      Model: [this.car.Model, [Validators.required, Validators.maxLength(20)]],
      RentalPrice: [this.car.RentalPrice, [Validators.required, Validators.min(100)]],
      IsAvailable: [this.car.IsAvailable, [Validators.required]] // Initialize with false (unavailable)
    });
  }

  EditCarDetail() {
    if (this.carId !== null && this.EditCarForm.valid) {
      this.service.EditCar(this.car.CarId, this.EditCarForm.value).subscribe({
        next: (item: any) => {
          if (item) {
            this._alert.openSnackBar('Edited successfully');
            this.router.navigate(['/home']);
          } else {
            this._alert.openSnackBar('Edit failed');
          }
        },
        error: (err: any) => {
          console.error('API Error:', err);
          // Handle errors
        }
      });
    }
  }
}
