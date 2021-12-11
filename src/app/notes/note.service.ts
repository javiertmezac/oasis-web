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

  getNotes(selectPaidNotes: boolean): Observable<any> {
    let tempUri = this.notesUri;
    if (selectPaidNotes) {
      tempUri = `${this.notesUri}?selectPaidNotes=true`
    } 
    return this.http.get(tempUri)
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
      employeeName: '',
      noteEmployee: {
        employeeId: 0,
        employeeName: '',
        note: '',
        tel: '',
        address: '',
        registration: new Date(),
        block: '',
        blockNumber: '',
        blockId: 0
      },
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
      paid: false,
      debt: 0
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

  updateNote(note: INoteBase) : Observable<any> {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.put<INoteBase>(this.notesUri, note, httpHeaders)
    .pipe(catchError(this.handleHttpClientError.handleError))
  }

  deleteNote(noteId:number): Observable<any> {
    return this.http.delete(`${this.notesUri}/${noteId}`)
    .pipe(catchError(this.handleHttpClientError.handleError))
  }

  fetchNotePaymentes(noteId: number): Observable<any> {
    return this.http.get(`${this.notesUri}/${noteId}/payments`)
    .pipe(catchError(this.handleHttpClientError.handleError));
  }

}