import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  pageTitle: string = 'Pedidos'

  constructor() { }

  ngOnInit(): void {
  }

  onAddClick(): void {
    alert('not ready yet!')
  }

}
