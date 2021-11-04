import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
    return this.http.get<INoteBase>(`${this.notesUri}/${noteId}`)
    .pipe(catchError(this.handleHttpClientError.handleError));
  }

}