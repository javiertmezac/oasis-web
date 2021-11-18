import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Price } from './price';
import { PriceService } from './price.service';

@Component({
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  pageTitle: string = 'Precio Granel';
  priceList: Price[] = []
  errorMessage = '';
  priceForm!: FormGroup

  constructor(private priceService: PriceService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getPrices();

    this.priceForm = this.fb.group({
      price: ['', Validators.required]
    })
  }

  getPrices():void {
    this.priceService.getPriceList().subscribe({
      next: response => this.priceList = response.pricesResponseList,
      error: err => this.errorMessage = err
    });
  }

  savePrice():void {
    if(this.priceForm.valid) {
      let p: Price = {
        priceId: 0,
        price : this.priceForm.get('price')?.value,
      }
      this.priceService.insertPrice(p).subscribe({
        next: () => {
          this.priceForm.reset();
          this.getPrices();
        },
        error: err => this.errorMessage = err
      });
    }

  }

}
