import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HandleHttpClientError } from "../shared/handle-error";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {

  private baseUri: string = environment.baseUri;
  private employeesApi = `${this.baseUri}/v1/employees`

  constructor(private http: HttpClient,
    private handleHttpError: HandleHttpClientError){}

  getEmployees(): Observable<any> {
    return this.http.get(this.employeesApi)
    .pipe(catchError(this.handleHttpError.handleError))
  }

  getEmployeesWithBlockNumber(): Observable<any> {
    return this.http.get(`${this.employeesApi}?listBlockNumber=true`)
    .pipe(catchError(this.handleHttpError.handleError))
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete(`${this.employeesApi}/${employeeId}`)
    .pipe(catchError(this.handleHttpError.handleError))
  }

}