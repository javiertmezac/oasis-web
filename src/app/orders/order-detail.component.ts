import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  pageTitle: string = 'Detalle Pedido'

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  onBack(): void {
    this.route.navigate(['/pedidos'])
  }

  onSave() : void {

  }

}
