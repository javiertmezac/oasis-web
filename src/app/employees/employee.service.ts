import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {

  private baseUri: string = environment.baseUri;
  private employeesApi = `${this.baseUri}/v1/employees`

  constructor(private http: HttpClient){}

  getEmployees(): Observable<any> {
    return this.http.get(this.employeesApi)
  }

  getEmployeesWithBlockNumber(): Observable<any> {
    return this.http.get(`${this.employeesApi}?listBlockNumber=true`)
  }

}