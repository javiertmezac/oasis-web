import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from './client.service';
import { IClient } from './client';

@Component({
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  pageTitle: string = 'Detalle Empresa';
  client!: IClient;
  errorMessage = '';

  constructor(private route: ActivatedRoute,
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
}
