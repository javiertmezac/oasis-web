import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
    return this.http.get<IContact>(`${this.contactsUri}/${id}`).pipe(
      catchError(this.handleHttpClientError.handleError)
    )
  }
}