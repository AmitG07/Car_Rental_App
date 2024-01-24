import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class APIService {
  placeOrder(customerId: any, cartData: any[]) {
    return this.http.post<any>(this.baseApiUrl + '/product/OrderProduct/' + customerId, cartData);
  }

  constructor(
    private http: HttpClient
  ) { }

  baseApiUrl = 'https://localhost:44354/api';
  ApiUrl = 'https://localhost:44354/api/user';

  API = 'http://localhost:4200/customer';

  LoginCustomer(data: any): Observable<any> {
    return this.http.post<any>(this.ApiUrl + '/login/post', data);
  }

  RegisterCustomer(data: any): Observable<any> {
    return this.http.post<any>(this.ApiUrl + '/register/post', data);
  }

  ManageCar(data: any): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/car/post', data);
  }

  GetCarById(id: any): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/car/GetCarById/' + id);
  }

  EditCar(id: any, data: any) {
    return this.http.put(this.baseApiUrl + '/car/EditCarById/' + id, data);
  }

  GetAllCars(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/car/GetAllCars');
  }

  DeleteCar(id: any) {
    return this.http.delete(this.baseApiUrl + '/car/DeleteCar/' + id);
  }

  RentCar(rentalData: any): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/rent/RentCar', rentalData);
  }

  GetAllRents(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/rent/GetAllRents');
  }

  GetAvailableStatus(CarId: any) {
    return this.http.get<any>(this.baseApiUrl + '/rent/GetAvailableStatus/' + CarId);
  }

  DeleteRent(id: any, userId: any): Observable<any> {
    console.log("rent", typeof (id), id);
    console.log("user", typeof (userId), userId);
    return this.http.delete<any>(this.baseApiUrl + '/rent/DeleteRent/' + id + "/" + userId);
  }

  EditRentalAgreement(id: any, data: any) {
    return this.http.put<any>(this.baseApiUrl + '/rent/EditRent/' + id, data);
  }

  GetOneRentalAgreement(id: any) {
    return this.http.get<any>(this.baseApiUrl + '/rent/GetRentById/' + id);
  }
}

