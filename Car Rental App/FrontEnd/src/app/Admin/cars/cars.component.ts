import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../../Services/api.service';
import { AlertService } from '../../Services/alert.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent implements OnInit {
  
  manageCarsform: FormGroup;

  constructor(
    private builder: FormBuilder,
    private service: APIService,
    private _alert: AlertService
  ) { }

  ngOnInit() {
    this.manageCarsform = this.builder.group({
      VehicleId: this.builder.control('', [Validators.required, Validators.maxLength(10)]),
      Brand: this.builder.control('', [Validators.required, Validators.maxLength(20)]),
      Model: this.builder.control('', [Validators.required, Validators.maxLength(20)]),
      RentalPrice: this.builder.control('', [Validators.required, Validators.min(100)]),
      Image: this.builder.control('', [Validators.required])
    });
  }

  manageCars() {
    console.log("Starting manageCars function");
    console.log(this.manageCarsform.value);

    // Temporarily remove validation
    this.manageCarsform.clearValidators();
    this.manageCarsform.updateValueAndValidity();

    this.service.ManageCar(this.manageCarsform.value).subscribe({
      next: (item: any) => {
        console.log("API call successful");
        this._alert.openSnackBar('!! Product Added !!');
      },
      error: (error: any) => {
        console.error("API call error:", error);
        // Handle the error, e.g., display an error message to the user
      },
    });

    // After submission, you can reapply validation if needed
    this.addValidation();
  }
  
  // Add validation back to the form controls
  addValidation() {
    this.manageCarsform.setValidators([
      Validators.required,
      Validators.maxLength(10), // Adjust validators as needed
      // Add more validators here
    ]);
    this.manageCarsform.updateValueAndValidity();
  }
}
