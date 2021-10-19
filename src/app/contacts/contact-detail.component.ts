import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContact } from './contact';
import { ContactService } from './contact.service';

@Component({
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  pageTitle: string = 'Detalle Contacto';
  contact!: IContact;
  errorMessage = '';

  constructor(private route: ActivatedRoute,
    private contactService: ContactService) {

    const contactId = Number(this.route.snapshot.paramMap.get('id'));
    if (contactId) {
      this.contactService.getContact(contactId).subscribe({
        next: response => {
          console.log(response)
          this.contact = response
        },
        error: error => this.errorMessage = error
      });
    }
  }

  ngOnInit(): void {}
}
