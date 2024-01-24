import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private customerSubject = new BehaviorSubject<string>(sessionStorage.getItem('customer'));

  CreatingCustomerSession(customer: any) {
    sessionStorage.setItem('customer', JSON.stringify(customer));
    this.customerSubject.next(sessionStorage.getItem('customer'));
  }

  RemoveCustomerSession() {
    sessionStorage.removeItem('customer');
    this.customerSubject.next(sessionStorage.getItem('customer'));
  }

  GetCustomerSession(): Observable<string> {
    return this.customerSubject.asObservable();
  }

  GetCustomerName(customer: any) {
    try {
      const parsedCustomer = JSON.parse(customer);
      const name = parsedCustomer?.name?.toUpperCase(); // Use 'name' instead of 'Name'
      // console.log('Parsed Customer:', parsedCustomer);
      // console.log('Customer Name:', name);
      return name;
    } catch (error) {
      // console.error('Error parsing customer data:', error);
      return 'Error Parsing Data';
    }
  }

  GetId() {
    return JSON.parse(sessionStorage.getItem('customer'))?.userId
  }

  isloggedin() {
    return sessionStorage.getItem('customer') != null;
  }

  GetCustomerRole(customer: any) {
    const parsedCustomer = JSON.parse(customer);
    const name = parsedCustomer?.name?.toUpperCase();
    if (name === "ADMIN1" || name === "ADMIN2")
      return true;
    else
      return false;
  }

}
