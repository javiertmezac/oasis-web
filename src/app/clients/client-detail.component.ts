import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from './client.service';
import { IClient } from './client';
import localePy from '@angular/common/locales/es';
import { registerLocaleData } from "@angular/common";

registerLocaleData(localePy, 'es');


@Component({
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  pageTitle: string = 'Detalle Empresa';
  client!: IClient;
  errorMessage = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService) {

    const clientId = Number(this.route.snapshot.paramMap.get('id'));

    if (clientId && clientId != 0) {
      this.clientService.getClient(clientId).subscribe({
        next: clientResponse => {
          this.client = clientResponse;
        },
        error: err => this.errorMessage = err
      });
    }
  }

  ngOnInit(): void {
  }

  deleteClient(): void {
    if(confirm(`Seguro de proceder con el borrado para el cliente: ${this.client.clientName}`)) {
      this.clientService.deleteClient(this.client.clientId).subscribe({
        next: () => this.router.navigateByUrl('/empresas'),
        error: err => this.errorMessage = err
      });
    }
  }
}
