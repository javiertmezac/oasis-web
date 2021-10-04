import { Component, OnInit } from "@angular/core";
import { IClient } from "./client";
import { ClientService } from "./client.service"

@Component({
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

export class ClientComponent implements OnInit {

  pageTitle: string = 'Empresas';
  private _listFilter = '';

  clients: IClient[] = [];
  filteredClients: IClient[] = [];

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredClients = this.performFilter(value);
  } 

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    console.log("ngOnInit")
    this.clients = this.clientService.getClients();
    this.filteredClients = this.performFilter(this._listFilter);
  }

  performFilter(filterBy: string): IClient[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.clients.filter((client: IClient) =>
      client.clientCodigo.toLocaleLowerCase().includes(filterBy));
  }

  onAddClick() : void {
    alert(
      'not ready yet!'
    )
  }
}