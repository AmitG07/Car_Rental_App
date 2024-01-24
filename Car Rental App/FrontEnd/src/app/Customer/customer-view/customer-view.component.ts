import { Component, OnInit } from '@angular/core';
import { APIService } from '../../Services/api.service';
import { AlertService } from '../../Services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})

export class CustomerViewComponent implements OnInit {
  
  viewDetails: any;
  id: any;
  role: any;
  customer: any;
  isCarAvailable: boolean | null = null;

  constructor(
    private _alert: AlertService,
    private route: ActivatedRoute,
    private _auth: AuthService,
    private service: APIService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._auth
      .GetCustomerSession()
      .subscribe((customer) => {
        this.customer = this._auth.GetCustomerName(customer);
        this.role = this._auth.GetCustomerRole(customer)
      });
      
    this.id = this.route.snapshot.params['id'];
    this.service.GetCarById(this.id).subscribe({
      next: (item: any) => {
        console.log(item);
        this.viewDetails = item;
        console.log(this.viewDetails);
      },
      error(err: any) {
      }
    })
    // Assuming you have retrieved the availability status using your API call
    this.service.GetAvailableStatus(this.id).subscribe((result: boolean) => {
      this.isCarAvailable = result;
    });
  }

  goBack() {
    // Use the router to navigate back to a previous route
    this.router.navigate(['/customer/customer-car']); // Replace '/previous-route' with your desired route
  }
}

