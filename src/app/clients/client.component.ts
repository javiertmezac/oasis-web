import { Component } from "@angular/core";

@Component({
  selector: 'pm-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  pageTitle: string = 'Empresas';
  clients: any[] = [
    {
      "nombre": "random" 
    },
    {
      "nombre": "random" 
    }
  ]

  private _listFilter = 'value';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
  } 
}