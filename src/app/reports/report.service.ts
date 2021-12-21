import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { HandleHttpClientError } from '../shared/handle-error';
import { NoRecentOrderReport } from './no-recent-order';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUri = environment.baseUri;
  private reportsUri = `${this.baseUri}/reports`

  constructor(private http: HttpClient,
    private handleHttpError: HandleHttpClientError) { }

  getNoRecentOrderReport() : Observable<NoRecentOrderReport> {
    const url = `${this.reportsUri}/clients/not-recent-order`
    return this.http.get<NoRecentOrderReport>(url)
    .pipe(catchError(this.handleHttpError.handleError))
  }
}
