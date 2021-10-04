import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  pageTitle: string = 'Pedidos'

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  onAddClick(): void {
    this.route.navigate(['/pedidos', Number(0)])
  }

}
