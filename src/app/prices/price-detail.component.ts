import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './price-detail.component.html',
  styleUrls: ['./price-detail.component.css']
})
export class PriceDetailComponent implements OnInit {

  pageTitle: string = 'Detalle Precio Granel';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onBack(): void {
    this.router.navigate(['/precios'])
  }

  onSave(): void {

  }
}
