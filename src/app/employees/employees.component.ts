import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  pageTitle: string = 'Trabajadores'
  employeeList: Employee[] = []
  errorMessage = ''

  constructor(private route: Router,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  onAddClick(): void {
    this.route.navigate(['/empleados', Number(0)])
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: response => this.employeeList = response.employeeList,
      error: err => this.errorMessage = err
    })
  }

  deleteEmployee(employeeId: number, employeeName: string): void {
    if (confirm(`Seguro de proceder con el borrado para el Trabajador: ${employeeName}?`)) {
      this.employeeService.deleteEmployee(employeeId).subscribe({
        next: () => this.getEmployees(),
        error: erro => this.errorMessage = erro
      });
    }
  }

}
