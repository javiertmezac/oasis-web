import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  pageTitle: string = 'Trabajadores'

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  onAddClick(): void {
    this.route.navigate(['/empleados', Number(0)])
  }

}
