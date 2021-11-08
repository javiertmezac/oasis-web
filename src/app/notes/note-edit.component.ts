import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Employee } from '../employees/employee';
import { EmployeeService } from '../employees/employee.service';
import { IOrder } from '../orders/order';
import { OrderService } from '../orders/order.service';
import { INoteBase } from './note-base';
import { NoteService } from './note.service';

@Component({
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {

  pageTitle = "Crear Nota";
  noteForm!: FormGroup;
  errorMessage = '';
  employeeList: Employee[] = [];
  note!: INoteBase;
  order!: IOrder;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private noteService: NoteService,
    private orderService: OrderService,
    private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.noteForm = this.fb.group({
      noteEmployee: [''],
      noteRegistration : '',
      noteCredit: '',
      noteInitialData: '',
      noteFinalData: '',
      noteDiscount: '',
      noteDiscountDescription: '',
      noteArrival: '',
      noteLoad: '',
      noteDeparture: ''
    });

    const orderId = Number(this.route.snapshot.paramMap.get("idPedido"));
    this.getOrder(orderId);

    const noteId  = Number(this.route.snapshot.paramMap.get("idNota"));
    this.getNote(noteId);

    this.loadEmployees();
  }

  saveNote(): void {}

  getOrder(orderId: number): void {
    this.orderService.getOrder(orderId).subscribe({
      next: data => this.order = data,
      error: err => this.errorMessage = err
    })
  }

  getNote(noteId: number): void {
    this.noteService.getNote(noteId).subscribe({
      next: data => this.note = data,
      error : error => this.errorMessage = error
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: data => {
        this.employeeList = data.employeeList;
      }
    });
  }
}
