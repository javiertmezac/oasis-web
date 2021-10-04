import { Injectable } from "@angular/core";
import { IClient } from "./client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  getClients(): IClient[] {
    return [
      {
        "clientId": 2,
        clientNombre: "random2"
      },
      {
        clientId: 3,
        clientNombre: "random3"
      }
    ]

  }
}