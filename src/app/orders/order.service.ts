import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
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
    return this.http.get<IOrder>(`${this.ordersUri}/${orderId}`)
    .pipe(catchError(this.handleHttpClientError.handleError));
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
}