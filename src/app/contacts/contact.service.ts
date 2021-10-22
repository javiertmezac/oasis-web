import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment"
import { HandleHttpClientError } from "../shared/handle-error";
import { IContact } from "./contact";

@Injectable({
  providedIn:'root'
})
export class ContactService {

  private baseUri = environment.baseUri;
  private contactsUri: string = `${this.baseUri}/v1/contacts`;

  constructor(private http: HttpClient,
    private handleHttpClientError: HandleHttpClientError) {}

  getContacts(): Observable<any> {
    return this.http.get(this.contactsUri)
    .pipe(
      catchError(this.handleHttpClientError.handleError)
    )
  }

  getContact(id:number): Observable<IContact> {
    if (id == 0) {
      return of(this.newContact());
    }
    return this.http.get<IContact>(`${this.contactsUri}/${id}`).pipe(
      catchError(this.handleHttpClientError.handleError)
    )
  }

  private newContact(): IContact {
    return {
      contactId: 0,
      contactName : '',
      contactLastName: '',
      contactSurName: '',
      contactPhone: '',
      contactTel: '',
      contactEmail: ''
    };
  }

  insertContact(contact: IContact): Observable<any> {
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    } 
    return this.http.post<IContact>(this.contactsUri, contact, httpHeader)
    .pipe(catchError(this.handleHttpClientError.handleError))
  }

  updateContact(contact: IContact): Observable<any> {
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    } 
    return this.http.put<IContact>(this.contactsUri, contact, httpHeader)
    .pipe(catchError(this.handleHttpClientError.handleError))
  }
}