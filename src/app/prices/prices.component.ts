import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  pageTitle: string = 'Precio Granel';

  constructor() { }

  ngOnInit(): void {
  }

  onAddClick(): void {
    alert('not ready yet!')
  }

}
