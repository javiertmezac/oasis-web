import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IContact } from './contact';
import { ContactService } from './contact.service';

@Component({
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  pageTitle: string = 'Contactos'
  filteredContacts: IContact[] = [];
  contacts: IContact[] = [];
  sub!: Subscription
  private _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredContacts = this.performFilter(value);
  } 

  constructor(private router: Router,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.sub = this.contactService.getContacts().subscribe({
      next: contactResponse => {
        this.contacts = contactResponse.contactsList;
        this.filteredContacts = this.contacts; 
      }
    });
  }

  onDestroy(): void {
    this.sub.unsubscribe();
  }

  performFilter(filterBy: string): IContact[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.contacts.filter((c: IContact) =>
      c.contactName.toLocaleLowerCase().includes(filterBy) ||
      c.contactLastName.toLocaleLowerCase().includes(filterBy) ); 
      // c.contactSurName.toLocaleLowerCase().includes(filterBy));
  }

}
