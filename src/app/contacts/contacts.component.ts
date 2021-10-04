import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  pageTitle: string = 'Contactos'

  constructor() { }

  ngOnInit(): void {
  }

  onAddClick(): void {
    alert('not ready!')
  }

}
