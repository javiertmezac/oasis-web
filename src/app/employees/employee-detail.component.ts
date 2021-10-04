import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  pageTitle: string = 'Detalle Trabajador'

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  onBack(): void {
    this.route.navigate(['/empleados'])
  }

  onSave(): void {}

}
