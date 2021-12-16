import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Price } from '../prices/price';
import { PriceService } from '../prices/price.service';
import { DateTimeHandler } from '../shared/datetime-handler';
import { IClient } from './client';
import { ClientService } from './client.service';

@Component({
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  pageTitle = 'Agregar Nueva Empresa'
  errorMessage = ''
  clientForm!: FormGroup
  client!: IClient;
  priceList: Price[] = []

  constructor(private fb: FormBuilder,
    private clientService: ClientService,
    private priceService: PriceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      clientName: ['', Validators.required],
      clientCode: '',
      clientInvoice: '',
      clientRfc: '',
      clientTel: '',
      clientNeighborhood: '',
      clientStreet: '',
      clientNoInt: '',
      clientNoOut: '',
      clientCp: '',
      clientPriceId: '',
      selectedPrice: ['', Validators.required],
      clientNextClean: new Date().toJSON().split('T')[0],
      nextCleaningComments: ''
    });

    this.getPriceList();

  }

  getClient(id: number): void {
    this.clientService.getClient(id).subscribe({
      next: (client: IClient) => {
        this.displayClientData(client)
      },
      error: err => this.errorMessage = err
    });
  }

  getPriceList(): void {
    this.priceService.getPriceList().subscribe({
      next: response => {

        this.priceList = response.pricesResponseList

        const clientId = Number(this.route.snapshot.paramMap.get('id'));
        this.getClient(clientId);
      },
      error: err => this.errorMessage = err
    });
  }

  displayClientData(client: IClient): void {

    if(this.clientForm) {
      this.clientForm.reset();
    }

    this.client = client;

    let selectedPrice ;
    let selectedNextCleanDate;

    if(this.client.clientId != 0) {
      this.pageTitle = "Editar Empresa : " + this.client.clientName;
      selectedPrice = this.priceList.filter(x => x.priceId == this.client.clientPriceId);
      selectedNextCleanDate = this.client.clientNextClean != null ? new Date(this.client.clientNextClean): null;
    } else {
      selectedPrice = this.priceList;
      selectedNextCleanDate = new Date()
    }

    this.clientForm.patchValue({
      clientName: this.client.clientName,
      clientCode: this.client.clientCode,
      clientInvoice: this.client.clientInvoice,
      clientRfc: this.client.clientRfc,
      clientTel: this.client.clientTel,
      clientNeighborhood: this.client.clientNeighborhood,
      clientStreet: this.client.clientStreet,
      clientNoInt: this.client.clientNoInt,
      clientNoOut: this.client.clientNoOut,
      clientCp: this.client.clientCp,
      selectedPrice: selectedPrice[0],
      clientNextClean: selectedNextCleanDate != null ? selectedNextCleanDate.toJSON().split('T')[0] : '',
      nextCleaningComments: this.client.nextCleaningComments
   });
  }


  saveClient(): void {
    if(this.clientForm.valid) {
      if (this.clientForm.dirty) {

        const c = { ...this.client, ...this.clientForm.value }

        if (c.clientId === 0) {
          c.clientInstantRegistration = Math.floor(c.clientRegistration.getTime() / 1000);

          const clientNextClean = new Date(c.clientNextClean)
          const timeOffset = DateTimeHandler.getDateTimeOffSet();
          const tempTime = new Date(clientNextClean.getTime() + timeOffset);
          c.clientInstantNextClean = Math.floor(tempTime.getTime() / 1000);

          c.clientPriceId = c.selectedPrice.priceId;

          this.clientService.insertClient(c).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        } else {

          c.clientPriceId = c.selectedPrice.priceId;
          const clientNextClean = new Date(c.clientNextClean)
          const nextClean = new Date(clientNextClean.getTime() + DateTimeHandler.getDateTimeOffSet())
          c.clientInstantNextClean = Math.floor(nextClean.getTime() / 1000);
         
          this.clientService.updateClient(c).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        }
        
      }else{
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = "Corregir Errores de Validación";
    }
  }

  onSaveComplete(): void {
    this.clientForm.reset();
    this.router.navigateByUrl('/empresas')
  }

  deleteClient(): void {}

}
