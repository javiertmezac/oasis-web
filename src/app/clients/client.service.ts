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

  getClientsV2(params: {
    page: number;
    size: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Observable<any> {
// .set('sortBy', params.sortBy || 'createdAt')
//       .set('sortOrder', params.sortOrder || 'asc');

    let url = `${this.baseUri}/v2/clients?page=${params.page}&size=${params.size}&search=${params.search}`
    return this.http.get(url)
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
      clientInstantNextClean: 0,
      nextCleaningComments: ''
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

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.clientsUrl}/${id}`)
    .pipe(catchError(this.handleHttpClientError.handleError))
  }

  getClientCleaningTankRecord(clientId: number): Observable<any> {
    return this.http.get(`${this.clientsUrl}/${clientId}/cleaning-tanks`)
    .pipe(catchError(this.handleHttpClientError.handleError));
  }

  deleteCleaningTankRecord(clientId: number,
    cleaningTankId: number): Observable<any> {
    return this.http.delete(
      `${this.clientsUrl}/${clientId}/cleaning-tanks/${cleaningTankId}`
      ).pipe(catchError(this.handleHttpClientError.handleError));
  }

}