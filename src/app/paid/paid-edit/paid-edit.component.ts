import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Employee } from 'src/app/employees/employee';
import { EmployeeService } from 'src/app/employees/employee.service';
import { INoteBase } from 'src/app/notes/note-base';
import { NoteService } from 'src/app/notes/note.service';
import { Paid } from './paid';
import { PaidService } from './paid.service';

@Component({
  templateUrl: './paid-edit.component.html',
  styleUrls: ['./paid-edit.component.css']
})
export class PaidEditComponent implements OnInit {

  pageTitle = 'Abonar!';
  errorMessage = ''
  paidForm!: FormGroup;
  paid!: Paid
  employee!: Employee
  note!: INoteBase
  registration!: Date
  debt!: Observable<number>

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private paidService: PaidService,
    private noteService: NoteService,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {

    const noteId = Number(this.route.snapshot.paramMap.get("idNota"));
    this.getNote(noteId);

    this.paidForm = this.fb.group({
      total: ['', Validators.required]
    });

    this.registration = new Date();
  }

  getNote(id:number) {
    this.noteService.getNote(id).subscribe({
      next: response => { 
        this.note = response
        this.paidForm.patchValue({
          total : this.note.debt
        });

        this.getEmployee(this.note.employeeId);
      },
      error: err => this.errorMessage = err
    })

  }

  getEmployee(employeeId: number): void {
    this.employeeService.getEmployee(employeeId).subscribe({
      next: response => this.employee = response,
      error: err => this.errorMessage = err
    });
  }

  savePaid(): void{
    if(this.paidForm.valid) {
      const p = {...this.paid, ...this.paidForm.value}
      p.payment = 0;
      p.noteId = this.note.noteId;
      p.registration = this.registration;
      p.employeeId = this.employee.employeeId;

      this.paidService.insertPaid(p).subscribe({
        next: () => {
          this.paidForm.reset();
          this.router.navigateByUrl('/notas')
        },
        error: err => this.errorMessage = err
      });

    } else {
      this.errorMessage = "Corregir Errores de Validación";
    }
  }

}
