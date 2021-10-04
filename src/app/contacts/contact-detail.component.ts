import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  pageTitle: string = 'Detalle Contacto'

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  onBack(): void {
    this.route.navigate(['/contactos'])
  }

  onSave(): void {

  }

}
