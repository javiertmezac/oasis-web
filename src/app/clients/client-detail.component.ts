import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from './client.service';
import { Subscription } from 'rxjs';
import { IClient } from './client';

@Component({
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  pageTitle: string = 'Editar Empresa';
  sub! : Subscription
  client!: IClient;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private clientService: ClientService) {

    const clientId = Number(this.route.snapshot.paramMap.get('id'));
    if (clientId && clientId != 0) {
      console.log('Client Detail Id: ', clientId)
      this.pageTitle = this.pageTitle + ": #" + clientId ;

      this.sub = clientService.getClient(clientId).subscribe({
        next: client => {
          this.client = client;
        }
      });

    } else {
      this.pageTitle = 'Agregar Empresa'
    }
  }

  ngOnInit(): void {
  }

  onBack(): void {
    this.router.navigate(['/empresas']);
  }

  onSave(): void {
    alert('save not implemented yet!');
  }
}
