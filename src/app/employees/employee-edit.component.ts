import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  pageTitle = "Nuevo Chofer";
  errorMessage = '';
  employeeForm!: FormGroup
  employee!: Employee;

  constructor(private fb:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employeeName: ['', [Validators.required, Validators.minLength(3)]],
      address: '',
      tel: ''
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getEmployee(id);
  }

  getEmployee(employeeId: number): void {
    this.employeeService.getEmployee(employeeId).subscribe({
      next: response => this.displayEmployee(response),
      error: err => this.errorMessage = err
    });
  }

  displayEmployee(employee: Employee): void {
    if (this.employeeForm) {

      this.employeeForm.reset();
    }
    this.employee = employee;

    if (this.employee.employeeId != 0) {
      this.pageTitle = "Editar Chofer" + ": " + this.employee.employeeName
    }

    this.employeeForm.patchValue({
      employeeName : this.employee.employeeName,
      address : this.employee.address,
      tel: this.employee.tel
    })

  }

  saveEmployee(): void {
    if(this.employeeForm.valid) {
      if(this.employeeForm.dirty) {
        const e = { ...this.employee, ...this.employeeForm.value }
        if (e.employeeId === 0) {
          this.employeeService.insertEmployee(e).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        } else {
          this.employeeService.updateEmployee(e).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = "Corregir Errores de Validadión";
    }
  }

  onSaveComplete():void {
    this.employeeForm.reset();
    this.router.navigateByUrl('/empleados');
  }

  deleteEmployee(): void {
    if (confirm(`Seguro de proceder con el borrado para el Trabajador: ${this.employee.employeeName}?`)) {
      this.employeeService.deleteEmployee(this.employee.employeeId).subscribe({
        next: () => this.onSaveComplete(),
        error: err => this.errorMessage = err
      });
    }
  }
}
