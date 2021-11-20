import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { HandleHttpClientError } from "src/app/shared/handle-error";
import { environment } from "src/environments/environment";
import { Block } from "./block";

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  private baseUri = environment.baseUri;
  private blocksUri: string = `${this.baseUri}/v1/blocks`;


  constructor(private http: HttpClient,
    private httpError: HandleHttpClientError){}

  insertBlock(block: Block): Observable<any> {

    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.post<Block>(this.blocksUri, block, httpHeaders)
    .pipe(catchError(this.httpError.handleError));
  }

  getBlock(id: number): Observable<Block> {
    return this.http.get<Block>(`${this.blocksUri}/${id}`)
    .pipe(catchError(this.httpError.handleError));
  }

}