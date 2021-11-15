import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { HandleHttpClientError } from "src/app/shared/handle-error";
import { environment } from "src/environments/environment";
import { Paid } from "./paid";

@Injectable({
  providedIn: 'root'
})
export class PaidService {

  private baseUri = environment.baseUri;
  private paidsUri: string = `${this.baseUri}/v1/payments`;


  constructor(private http: HttpClient,
    private httpError: HandleHttpClientError){}

  insertPaid(paid: Paid): Observable<any> {

    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.post<Paid>(this.paidsUri, paid, httpHeaders)
    .pipe(catchError(this.httpError.handleError))
  }

}