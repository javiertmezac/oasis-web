import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  pageTitle: string = 'Contactos'

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onAddClick(): void {
    this.router.navigate(['/contactos', Number(0)])
  }

}
