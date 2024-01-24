import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { APIService } from '../../Services/api.service';
import { AlertService } from '../../Services/alert.service';

@Component({
  selector: 'app-customer-rental',
  templateUrl: './customer-rental.component.html',
  styleUrls: ['./customer-rental.component.css']
})
export class CustomerRentalComponent implements OnInit {

  rentCarform: FormGroup;
  rentalPrice: number;
  userId: string | null;
  rentalPricePerDay: number;
  rentalError: string | null = null;
  carId: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private service: APIService,
    private _alert: AlertService
  ) {
    this.rentCarform = this.formBuilder.group({
      StartDate: [new Date().toISOString().split("T")[0], Validators.required],
      EndDate: ['', Validators.required],
      RentalPrice: [{ value: 0, disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.rentalPricePerDay = +params['rentalPrice']; // Set rentalPricePerDay from query parameter
      const carId = parseInt(params['carId'], 10);

      // Now, you have the rentalPricePerDay and vehicleId to use in this component
      console.log('Rental Price Per Day:', this.rentalPricePerDay);
      console.log('Car ID:', carId);
      this.userId = this.authService.GetId(); // Replace with the actual method or property name
      console.log('User ID:', this.userId); 

      // Set the initial value of RentalPrice field
      this.rentCarform.get('RentalPrice').setValue(this.rentalPrice);
    });

    // Subscribe to changes in StartDate and EndDate fields
    this.rentCarform.get('StartDate').valueChanges.subscribe(() => {
      this.calculateRentalPrice();
    });

    this.rentCarform.get('EndDate').valueChanges.subscribe(() => {
      this.calculateRentalPrice();
    });
  }

  calculateRentalPrice() {
    const startDate = this.rentCarform.get('StartDate').value;
    const endDate = this.rentCarform.get('EndDate').value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Calculate the number of days between the start and end dates
      const daysDifference = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

      // Update the RentalPrice field
      const rentalPrice = daysDifference * this.rentalPricePerDay;
      this.rentCarform.get('RentalPrice').setValue(rentalPrice);
    } else {
      // Handle the case when start date or end date is not selected
      this.rentCarform.get('RentalPrice').setValue(0); // You can set a default value or handle it differently
    }
  }

  rentCar() {
    // Get the selected start date and end date from the form
    const startDate = this.rentCarform.get('StartDate').value;
    const endDate = this.rentCarform.get('EndDate').value;
  
    // Ensure that all required data is available before proceeding
    if (this.userId && startDate && endDate) {
      // Construct the data to send to the ApiService
      const carId = parseInt(this.route.snapshot.queryParams['carId'], 10); // Get carId from route query params
      console.log(typeof(carId));
      const rentalPrice = this.rentCarform.get('RentalPrice').value;
      
      // Create an object with the data
      const rentalData = {
        CarId: carId,
        UserId: this.userId,
        StartDate: startDate,
        EndDate: endDate,
        RentedPrice: rentalPrice
      };

      console.log(rentalData);
  
      // Call the RentCar function in the ApiService
      this.service.RentCar(rentalData)
        .subscribe(response => {
          // Handle the response from the API if needed
          console.log('RentCar API Response:', response);
          this._alert.openSnackBar('Car Booked');
          this.rentalError = null;
          // You can perform further actions or navigate the user to a different page.
        }, error => {
          // Handle any errors from the API request
          console.error('RentCar API Error:', error);
        // Provide user feedback about the error
        this.rentalError = 'An error occurred while renting the car. Please try again later.';
      });
    }
  }
}
