import { Component, OnInit } from '@angular/core';
import { IOrder } from './order';
import { OrderService } from './order.service';
import localePy from '@angular/common/locales/es';
import { registerLocaleData } from "@angular/common";

registerLocaleData(localePy, 'es');


@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  pageTitle: string = 'Pedidos'
  errorMessage = '';
  private _listFilter = '';

  orderList: IOrder[] = []
  filteredOrders: IOrder[] = [];

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredOrders = this.performFilter(value);
  } 

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe({
      next: orderResponse => {
        this.orderList = orderResponse.ordersList;
        this.filteredOrders = this.orderList;
      },
      error: err => {
        const emptyListError = "Could not fetch Orders";
        if (!err.includes(emptyListError)) {
          this.errorMessage = err
        } else {
          this.filteredOrders = [];
        }
      }
    });
  }

  deleteOrder(orderId: number):void {
    console.log('on delete btn: ', orderId)
    if (confirm(`Seguro de proceder con el borrado para el Pedido: ${orderId}?`)) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => this.getOrders(),
        error: error => this.errorMessage = error
      })
    }

  }

  performFilter(filterBy : string): IOrder[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.orderList.filter(
      (order: IOrder) => 
        order.clientName.toLocaleLowerCase().includes(filterBy) ||
        order.employeeName.toLocaleLowerCase().includes(filterBy) ||
        String(order.orderId).includes(filterBy) ||
        order.note?.toLocaleLowerCase().includes(filterBy)
    );
  }
}
