import { Component, OnInit } from '@angular/core';
import { APIService } from '../../Services/api.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-customer-car',
  templateUrl: './customer-car.component.html',
  styleUrls: ['./customer-car.component.css']
})

export class CustomerCarComponent implements OnInit {
  Cars: any;
  filteredCars: any[] = [];
  selectedBrand: string | null = null;
  selectedModel: string | null = null;
  selectedPrice: number | null = null;
  term: any;
  filter: any = {};

  brandFilter: string = '';
  modelFilter: string = '';
  priceFilter: number | null = null;

  constructor(
    private service: APIService,
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

  filterData() {
    this.Cars = this.Cars.filter((item) => {
      return (
        (this.brandFilter === '' || item.brand.includes(this.brandFilter)) &&
        (this.modelFilter === '' || item.model.includes(this.modelFilter)) &&
        (this.priceFilter === null || item.price >= this.priceFilter)

      );
    });
    //check if its empty
    if (this.brandFilter === '' && this.modelFilter === '' && this.priceFilter === null) {
      this.Cars = this.LoadListData();
    }
  }
}