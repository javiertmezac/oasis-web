import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
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
      .pipe(catchError(this.handleHttpClientError.handleError));
  }

  getClient(clientId: number): Observable<IClient> {
    if (clientId === 0) {
      return of(this.newClient());
    }
    return this.http.get<IClient>(`${this.clientsUrl}/${clientId}`)
    .pipe(catchError(this.handleHttpClientError.handleError));
  };

  newClient(): IClient {
    const datePick = new Date();
    return {
      clientId: 0,
      clientCode: '',
      clientInvoice: '',
      clientName: '',
      clientRfc: '',
      clientTel: '',
      clientNeighborhood: '',
      clientStreet: '',
      clientNoInt: '',
      clientNoOut: '',
      clientCp: '',
      clientStatus: false,
      clientRegistration: datePick,
      clientInstantRegistration: 0,
      clientPrice: 0,
      selectedPrice: { priceId: 0, price: 0},
      clientPriceId: 0,
      clientNextClean: datePick,
      clientInstantNextClean: 0
    }
  }

  insertClient(client: IClient): Observable<any> {
    return this.http.post<IClient>(this.clientsUrl, client, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleHttpClientError.handleError))
  }

  updateClient(client: IClient): Observable<any> {
    return this.http.put<IClient>(this.clientsUrl, client, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(catchError(this.handleHttpClientError.handleError))
  }
}