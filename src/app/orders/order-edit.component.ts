import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IClient } from '../clients/client';
import { ClientService } from '../clients/client.service';
import { Employee } from '../employees/employee';
import { EmployeeService } from '../employees/employee.service';
import { DateTimeHandler } from '../shared/datetime-handler';
import { OrderNotification } from '../shared/order/order-notification';
import { OrderPriority } from '../shared/order/order-priority';
import { IOrder } from './order';
import { OrderService } from './order.service';


@Component({
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  pageTitle = "Nuevo Pedido";
  orderForm!: FormGroup;
  client!: IClient;
  employeeList: Employee[] = []
  notificationList: OrderNotification[] = []
  priorityList: OrderPriority[] = []
  order!: IOrder;

  errorMessage = '';

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private orderService: OrderService,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      orderEmployee: ['', Validators.required],
      orderRegistration: new Date(),
      orderDelivery:  ['', Validators.required],
      orderNotification: '',
      orderPriority: '',
      orderComments: '',
    });

    this.loadEmployees();

    const clientId = Number(this.route.snapshot.paramMap.get('idEmpresa'));
    this.getClient(clientId);
  }

  getClient(id:number): void {
    this.clientService.getClient(id).subscribe({
      next: clientResponse => this.client = clientResponse,
      error: error => this.errorMessage = error
    });
  }

  saveOrder():void {
    if(this.orderForm.valid) {
      if (this.orderForm.dirty) {

       if(this.order.orderId === 0) {
        const o = this.convertOrderFromValue(this.orderForm.value);

          this.orderService.insertOrder(o)
          .subscribe({
            next: () => {
              return this.onSaveComplete();
            },
            error: err => this.errorMessage = err
          });
        } else {
          const newOrder = this.convertOrderFromValue(this.orderForm.value);
          this.orderService.updateOrder(newOrder).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage =  'Corregir Errores de Validación.'
    }
  }

  private convertOrderFromValue(o: any): any {
    const newDeliveryDate = new Date(o.orderDelivery);

    return {
      orderId: this.order.orderId != 0 ? this.order.orderId : 0,
      employeeId: o.orderEmployee.employeeId,
      clientId: this.client.clientId,
      registrationDate : Math.floor(o.orderRegistration.getTime() / 1000),
      deliveryDate : Math.floor((newDeliveryDate.getTime() + DateTimeHandler.getDateTimeOffSet()) / 1000),
      comments: o.orderComments,
      status: true,
      notification: o.orderNotification.id,
      priority: o.orderPriority.id,
    }
  }

  onSaveComplete(): void {
    this.orderForm.reset();
    this.router.navigateByUrl('/pedidos');
  }

  getOrder(id: number) {
    this.orderService.getOrder(id).subscribe({
      next: data => this.displayOrderData(data),
      error: err => this.errorMessage = err
    });
  }

  displayOrderData(order: IOrder): void {
    if (this.orderForm) {
      this.orderForm.reset();
    }

    this.order = order;

    let pickDate = new Date();
    let deliveryDate = pickDate;
    let selectedPriority = this.priorityList[0];
    let selectedNotification = this.notificationList[0];
    let selectedEmployee = this.employeeList[0];
    
    if(this.order.orderId != 0) {
      this.pageTitle = "Editar Pedido: #" + this.order.orderId;
      pickDate = new Date(this.order.registration)
      deliveryDate = new Date(this.order.delivery)

      selectedNotification = this.notificationList.filter(x => 
        x.id == this.order.notification)[0];

      selectedPriority = this.priorityList.filter(x =>
        x.id == this.order.priority)[0];

      selectedEmployee = this.employeeList.filter(x =>
        x.employeeId == this.order.employeeId)[0]
    }

// .toLocaleDateString('es', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    this.orderForm.patchValue({
      orderRegistration : pickDate,
      orderDelivery: deliveryDate.toJSON().split('T')[0],
      orderPriority: selectedPriority,
      orderNotification: selectedNotification,
      orderEmployee: selectedEmployee,
      orderComments: this.order.comments
    });
  }

  loadNotifications() {
    this.orderService.getOrderNotifications().subscribe({
      next: data => {
        this.notificationList = data;
      },
      error: err => this.errorMessage = err
    });
  }

  loadPriorities() {
    this.orderService.getOrderPriorities().subscribe({
      next: data => {
        this.priorityList = data;

        const orderId = Number(this.route.snapshot.paramMap.get('idPedido'));
        this.getOrder(orderId);

      },
      error: err => this.errorMessage = err
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: data => {
        this.employeeList = data.employeeList;

        this.loadNotifications();
        this.loadPriorities();

      },
      error: err => this.errorMessage = err
    });
  }
}
