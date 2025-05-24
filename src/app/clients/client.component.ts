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

  clients: IClient[] = [];
  pagination = { currentPage: 0, pageSize: 20, totalPages: 0, totalItems: 0 };
  jumpToPage = 1;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
  }

  constructor(private clientService: ClientService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadClients();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onPageChange(newPage: number) {
    this.loadClients(newPage, this._listFilter);
  }

  loadClients(page = 0, search = ''
  ) {
    this.sub = this.clientService.getClientsV2({
      page,
      size: this.pagination.pageSize,
      search: search
    }).subscribe({
      next: r => {
        this.clients = r.clients;
        this.pagination = r.pagination;
      },
      error: e => this.errorMessage = e
    })
  }

  goToPage() {
    const pageIndex = this.jumpToPage - 1;

    if (
      pageIndex >= 0 &&
      pageIndex < this.pagination.totalPages
    ) {
      this.onPageChange(pageIndex);
    } else {
      alert('Invalid page number');
    }
  }

  performFilter() {
    let filterBy = this._listFilter.toLocaleLowerCase();
    this.loadClients(0, filterBy);
  }
}