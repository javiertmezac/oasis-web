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
    );
  };
}