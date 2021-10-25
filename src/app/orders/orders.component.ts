import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from './order';
import { OrderService } from './order.service';

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  pageTitle: string = 'Pedidos'

  orderList: IOrder[] = []
  responseOrder: any[] = [];

  constructor(private route: Router,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: orderResponse => {
        this.responseOrder = orderResponse.ordersList;
        this.orderList = this.responseOrder;
      }
    })
  }
}
