import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'xj-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  pageTitle = "Nuevo Pedido";
  errorMessage = '';
  orderForm!: FormGroup;

  constructor(private fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      orderRegistration: [new Date(), Validators.required]
    });

  }

  saveOrder():void{}
  deleteContact():void{}

}
