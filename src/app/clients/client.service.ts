import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { IClient } from "./client";
import { environment } from "../../environments/environment"
import { HandleHttpClientError } from "../shared/handle-error";


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUri = environment.baseUri;
  private clientsUrl: string = `${this.baseUri}/v1/clients`;

  constructor(private http: HttpClient,
    private handleHttpClientError: HandleHttpClientError) {}

  getClients(): Observable<any> {
    return this.http.get(this.clientsUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleHttpClientError.handleError)
      );
  }

  getClient(clientId: number): Observable<IClient> {
    return this.http.get<IClient>(`${this.clientsUrl}/${clientId}`)
    .pipe(
      tap(data => console.log('Client-Detail: ', JSON.stringify(data))),
      catchError(this.handleHttpClientError.handleError)
    )
    
  }

  // private handleError(err: HttpErrorResponse): Observable<never> {
  //   // in a real world app, we may send the server to some remote logging infrastructure
  //   // instead of just logging it to the console
  //   let errorMessage = '';
  //   if (err.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     errorMessage = `An error occurred: ${err.error.message}`;
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  //   }
  //   console.error(errorMessage);
  //   return throwError(errorMessage);
  // }
}