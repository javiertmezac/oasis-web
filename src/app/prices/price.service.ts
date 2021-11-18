import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HandleHttpClientError } from "../shared/handle-error";
import { Price } from "./price";

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private baseUri = environment.baseUri;
  private pricesUrl: string = `${this.baseUri}/v1/prices`;

  constructor(private http: HttpClient,
    private handleHttpClientError: HandleHttpClientError) {}

    getPriceList(): Observable<any> {
      return this.http.get(this.pricesUrl)
      .pipe(catchError(this.handleHttpClientError.handleError))
    }

    insertPrice(price: Price): Observable<any> {
      return this.http.post<Price>(this.pricesUrl,price, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).pipe(catchError(this.handleHttpClientError.handleError))
    }

    deletePrice(id: number): Observable<any> {
      return this.http.delete(`${this.pricesUrl}/${id}`)
      .pipe(catchError(this.handleHttpClientError.handleError))
    }
}