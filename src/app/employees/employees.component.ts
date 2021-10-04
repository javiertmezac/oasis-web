import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  pageTitle: string = 'Trabajadores'

  constructor() { }

  ngOnInit(): void {
  }

  onAddClick(): void {
    alert('not ready yet!')
  }

}
