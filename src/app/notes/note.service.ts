import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment"
import { HandleHttpClientError } from "../shared/handle-error";
import { INoteBase } from "./note-base";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private baseUri = environment.baseUri;
  private notesUri: string = `${this.baseUri}/v1/notes`;

  constructor(private http: HttpClient,
    private handleHttpClientError: HandleHttpClientError) { }

  getNotes(): Observable<any> {
    return this.http.get(this.notesUri)
    .pipe(catchError(this.handleHttpClientError.handleError));
  }

  getNote(noteId: number): Observable<INoteBase> {
    if (noteId === 0) {
      return of(this.newNote())
    }
    return this.http.get<INoteBase>(`${this.notesUri}/${noteId}`)
    .pipe(catchError(this.handleHttpClientError.handleError));
  }

  private newNote(): INoteBase {
    return {
      noteId: 0,
      note: '',
      orderId: 0,
      employeeId: 0,
      noteEmployee: { employeeId : 0, employeeName: '', note: '', tel: ''},
      registration: new Date(),
      registrationDate: '',
      liters: 0,
      credit: false,
      total: 0,
      initialData: 0,
      finalData: 0,
      arrival: '',
      load: '',
      departure: '',
      price: 0,
      status: false,
      discount: 0,
      discountDescription: '',
      paid: false
    }
  }

  insertNote(note: INoteBase): Observable<any> {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<INoteBase>(this.notesUri, note, httpHeaders)
    .pipe(catchError(this.handleHttpClientError.handleError))
  }

}