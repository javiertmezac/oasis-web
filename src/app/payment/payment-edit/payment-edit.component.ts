import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Employee } from 'src/app/employees/employee';
import { EmployeeService } from 'src/app/employees/employee.service';
import { INoteBase } from 'src/app/notes/note-base';
import { NoteService } from 'src/app/notes/note.service';
import { Payment } from './payment';
import { PaymentService } from './payment.service';

@Component({
  templateUrl: './Payment-edit.component.html',
  styleUrls: ['./Payment-edit.component.css']
})
export class PaymentEditComponent implements OnInit {

  pageTitle = 'Abonar!';
  errorMessage = ''
  paymentForm!: FormGroup;
  payment!: Payment
  employeeList!: Employee[]
  note!: INoteBase
  registration!: Date
  debt!: Observable<number>

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private noteService: NoteService,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {

    this.paymentForm = this.fb.group({
      total: ['', Validators.required],
      employeeList: [null, Validators.required]
    });

    this.registration = new Date();

    const noteId = Number(this.route.snapshot.paramMap.get("idNota"));
    this.getNote(noteId);
    this.getEmployees();
  }

  getNote(id:number) {
    this.noteService.getNote(id).subscribe({
      next: response => { 
        this.note = response

        this.paymentForm.patchValue({
          total : this.note.debt
        });
      },
      error: err => this.errorMessage = err
    });
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: response => {
        this.employeeList = response.employeeList;
      },
      error: err => this.errorMessage = err
    });
  }

  savePayment(): void{
    if(this.paymentForm.valid) {
      const p = {...this.payment, ...this.paymentForm.value}
      p.payment = 0;
      p.noteId = this.note.noteId;
      p.registration = this.registration;
      p.employeeId = p.employeeList.employeeId;

      this.paymentService.insertPayment(p).subscribe({
        next: () => {
          this.paymentForm.reset();
          this.router.navigateByUrl('/notas')
        },
        error: err => this.errorMessage = err
      });

    } else {
      this.errorMessage = "Corregir Errores de Validación";
    }
  }

}
