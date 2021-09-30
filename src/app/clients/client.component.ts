import { Component, OnInit } from "@angular/core";
import { IClient } from "./client";
import { ClientService } from "./client.service"

@Component({
  selector: 'pm-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  private _listFilter = 'value';
  pageTitle: string = 'Empresas';
  clients: IClient[] = [];

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
  } 

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    console.log("ngOnInit")
    this.clients = this.clientService.getClients();

  }
}