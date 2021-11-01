import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact } from './contact';
import { ContactService } from './contact.service';

@Component({
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  // @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  contactForm! : FormGroup;
  pageTitle = "Nuevo Contacto";
  errorMessage = '';
  contact!: IContact;

  displayMessage : { [key: string]: string } = {};

  constructor(private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router) {

      const contactId = Number(this.route.snapshot.paramMap.get('id'));
      this.getContact(contactId);
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      contactName: ['', Validators.required],
      contactLastName: ['', Validators.required],
      contactSurName: '',
      contactPhone: '',
      contactTel: '',
      contactEmail: ['', Validators.email]
    });
  }

  getContact(id: number) {
    this.contactService.getContact(id).subscribe({
      next: (contact: IContact) => this.displayContactData(contact),
      error: error => this.errorMessage = error
    });
  }

  displayContactData(contact: IContact): void {
    if (this.contactForm) {
      this.contactForm.reset();
    }
    this.contact = contact;

    if(this.contact.contactId != 0) {
      this.pageTitle = "Editar Contacto" + ": " + this.contact.contactName;
    }

    this.contactForm.patchValue({
      contactName: this.contact.contactName,
      contactLastName: this.contact.contactLastName,
      contactSurName: this.contact.contactSurName,
      contactPhone: this.contact.contactPhone,
      contactTel: this.contact.contactTel,
      contactEmail: this.contact.contactEmail
    });

  }

  saveContact() {
    if (this.contactForm.valid) {
      if (this.contactForm.dirty) {
        const c = { ...this.contact, ...this.contactForm.value };

        if (c.contactId === 0) {
          this.contactService.insertContact(c)
            .subscribe({
              next: x => {
                console.log(x);
                return this.onSaveComplete();
              },
              error: err => this.errorMessage = err
            });
        } else {
          this.contactService.updateContact(c)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Corregir Errores de Validación.';
    }
  }

  deleteContact() {
    if (this.contact.contactId === 0) {
      this.onSaveComplete();
    } else if (confirm(`Seguro de eliminar el registro de contacto ${this.contact.contactName} ${this.contact.contactLastName}?`)) {
      this.contactService.deleteContact(this.contact).subscribe({
        next: () => this.onSaveComplete(),
        error: error => this.errorMessage = error
      });
    }
  }

  onSaveComplete() {
    this.contactForm.reset();
    this.router.navigateByUrl('/contactos')
  }
}