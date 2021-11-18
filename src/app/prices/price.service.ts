import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HandleHttpClientError } from "../shared/handle-error";

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
}