import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  pageTitle: string = 'Precio Granel';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onAddClick(): void {
    this.router.navigate(['/precios', Number(0)])
  }

}
