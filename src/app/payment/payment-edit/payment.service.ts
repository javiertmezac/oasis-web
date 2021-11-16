import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { HandleHttpClientError } from "src/app/shared/handle-error";
import { environment } from "src/environments/environment";
import { Payment } from "./payment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUri = environment.baseUri;
  private paymentsUri: string = `${this.baseUri}/v1/payments`;


  constructor(private http: HttpClient,
    private httpError: HandleHttpClientError){}

  insertPayment(payment: Payment): Observable<any> {

    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.post<Payment>(this.paymentsUri, payment, httpHeaders)
    .pipe(catchError(this.httpError.handleError))
  }

}