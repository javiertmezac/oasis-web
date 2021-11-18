import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HandleHttpClientError } from "../shared/handle-error";
import { Employee } from "./employee";

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

  getEmployee(id: number): Observable<Employee> {
    if(id === 0) {
      return of(this.newEmployee());
    }
    return this.http.get<Employee>(`${this.employeesApi}/${id}`)
    .pipe(catchError(this.handleHttpError.handleError))
  }

  newEmployee(): Employee {
    return {
      employeeId : 0,
      employeeName: '',
      tel: '',
      address: '',
      note: '',
      registration: new Date(),
      blockNumber: '',
      block: '',
      blockId: 0
    }
  }

  insertEmployee(employee: Employee): Observable<any> {
    return this.http.post<Employee>(this.employeesApi, employee, {
      headers: { 'Content-Type': 'application/json'}
    }).pipe(catchError(this.handleHttpError.handleError))
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put<Employee>(this.employeesApi, employee, {
      headers: { 'Content-Type': 'application/json'}
    }).pipe(catchError(this.handleHttpError.handleError))
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete(`${this.employeesApi}/${employeeId}`)
    .pipe(catchError(this.handleHttpError.handleError))
  }

  deleteEmployeeCurrentBlockNumber(employeeId: number,
    blockId: number, currentBlockNumber: string, description: string): Observable<any> {
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }
    let body = `description=${description}`;
      return this.http
      .post(`${this.employeesApi}/${employeeId}/blocks/${blockId}?currentBlockNumber=${currentBlockNumber}`,
      body, httpHeader)
      .pipe(catchError(this.handleHttpError.handleError))
    }
}