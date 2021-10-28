import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "../../environments/environment"
import { HandleHttpClientError } from "../shared/handle-error";
import { IOrder } from "./order";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUri = environment.baseUri;
  private ordersUri: string = `${this.baseUri}/v1/orders`;

  constructor(private http: HttpClient,
    private handleHttpClientError: HandleHttpClientError) { }

  getOrders(): Observable<any> {
    return this.http.get(this.ordersUri)
    .pipe(catchError(this.handleHttpClientError.handleError));

  }

  getOrder(orderId: number): Observable<IOrder> {
    if (orderId === 0) {
      return of(this.newOrder());
    }
    return this.http.get<IOrder>(`${this.ordersUri}/${orderId}`)
    .pipe(catchError(this.handleHttpClientError.handleError));
  }

  private newOrder(): IOrder {
    return {
      orderId: 0,
      employeeId: 0,
      employeeName: '',
      clientId: 0,
      clientName: '',
      registrationDate : new Date(),
      deliveryDate : new Date(),
      delivery: 0,
      registration: 0,
      comments: '',
      status: false,
      notification: 0,
      notificationDescr: '',
      priority: 0,
      priorityDescr: ''
    }
  }

  insertOrder(order: IOrder): Observable<any> {
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    } 
    return this.http.post<IOrder>(this.ordersUri, order, httpHeader)
    .pipe(catchError(this.handleHttpClientError.handleError))
  }

  getOrderNotifications(): Observable<any> {
    return this.http.get("/api/order-notification.json")
    .pipe(tap(data => console.log(data)))
  }

  getOrderPriorities(): Observable<any> {
    return this.http.get("/api/order-priority.json")
    .pipe(tap(data => console.log(data)))
  }
}