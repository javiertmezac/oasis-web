import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IClient } from "./client";
import { ClientService } from "./client.service"
import { Subscription } from 'rxjs';
import localePy from '@angular/common/locales/es';
import { registerLocaleData } from "@angular/common";

registerLocaleData(localePy, 'es');

@Component({
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

export class ClientComponent implements OnInit {

  pageTitle: string = 'Empresas';
  errorMessage = '';
  private _listFilter = '';
  sub!: Subscription

  responseClients : any = [];
  clients: IClient[] = [];
  filteredClients: IClient[] = [];

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredClients = this.performFilter(value);
  } 

  constructor(private clientService: ClientService,
              private router: Router) {}

  ngOnInit(): void {
    console.log("ngOnInit")

    this.sub = this.clientService.getClients().subscribe({
      next: clients => {
        this.responseClients = clients.clientsResponses;

        this.clients = this.responseClients;
        this.filteredClients = this.clients;
      },
      error: err => this.errorMessage = err
    });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  performFilter(filterBy: string): IClient[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.clients.filter((client: IClient) =>
      client.clientName.toLocaleLowerCase().includes(filterBy) || client.clientNeighborhood.toLocaleLowerCase().includes(filterBy));
  }
}