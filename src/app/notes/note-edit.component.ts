import { JsonpClientBackend, JsonpInterceptor } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IClient } from '../clients/client';
import { ClientService } from '../clients/client.service';
import { Employee } from '../employees/employee';
import { EmployeeService } from '../employees/employee.service';
import { IOrder } from '../orders/order';
import { OrderService } from '../orders/order.service';
import { DateTimeHandler } from '../shared/datetime-handler';
import { INoteBase } from './note-base';
import { NoteService } from './note.service';
import { NumberValidators } from './number.validator';

@Component({
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {

  pageTitle = "Crear Nota";
  noteForm!: FormGroup;
  errorMessage! : string;
  employeeList: Employee[] = [];
  note!: INoteBase;
  order!: IOrder;
  client!: IClient;

  total!:number;
  totalData!: number;

  selectedEmployee!: Employee;
  editNote: boolean = false

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private orderService: OrderService,
    private clientService: ClientService,
    private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.noteForm = this.fb.group({
      noteEmployee: '',
      registrationDate : ['', Validators.required],
      credit: '',
      initialData: ['', [NumberValidators.number,Validators.required]],
      finalData: ['', Validators.required],
      discount: '',
      discountDescription: '',
      arrival: ['', Validators.maxLength(5)],
      load: ['', Validators.maxLength(5)],
      departure: ['', Validators.maxLength(5)]
    });

    this.loadEmployees();
  }

  loadFromPathParams(): void {
    const orderId = Number(this.route.snapshot.paramMap.get("idPedido"));
    this.getOrder(orderId);

    const noteId  = Number(this.route.snapshot.paramMap.get("idNota"));
    this.getNote(noteId);
  }

  saveNote(): void {
    if (this.noteForm.valid) {
      if (this.noteForm.dirty) {

        const n = { ...this.note, ...this.noteForm.value }
          const actualPick = new Date(n.registrationDate)
          const actualPickMil = new Date(actualPick.getTime() +
            DateTimeHandler.getDateTimeOffSet() +
            DateTimeHandler.getCurrentTimeMil());
          n.registrationDate = Math.floor(actualPickMil.getTime() / 1000);
          n.liters = this.totalData;
          n.total = this.total;
          n.price = this.client.clientPrice;

        if (this.note.noteId === 0) {

          n.employeeId = n.noteEmployee.employeeId;
          n.orderId = this.order.orderId;
          n.note = n.noteEmployee.note;

          this.noteService.insertNote(n).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        } else {
          // n.registrationDate  = Math.floor(n.registration / 1000);
          console.log(n)
          this.noteService.updateNote(n).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = "Corregir Errorers de Validación";
    }
  }

  onSaveComplete(): void {
    this.noteForm.reset();
    this.router.navigateByUrl('/notas')
  }

  getOrder(orderId: number): void {
    this.orderService.getOrder(orderId).subscribe({
      next: data => {
        this.order = data
        this.getClient(this.order.clientId);
      },
      error: err => this.errorMessage = err
    })
  }

  getNote(noteId: number): void {
    this.noteService.getNote(noteId).subscribe({
      next: data => this.displayNote(data),
      error : error => this.errorMessage = error
    });
  }

  displayNote(note: INoteBase): void {
    if(this.noteForm) {
      this.noteForm.reset();
    }

    this.note = note;
    let regDate = this.note.registration;
    let employee = null;

    if(this.note.noteId != 0) {
      this.pageTitle = "Editar Nota" + ": " + this.note.note;
      this.editNote = true;
      this.total = this.note.total;
      this.totalData = this.note.liters;
      regDate = new Date(this.note.registration)
      employee = this.employeeList.filter(x => x.employeeId == this.note.employeeId)[0];
    }

    this.noteForm.patchValue({
      noteEmployee : employee,
      registrationDate: regDate.toLocaleDateString('fr-CA'),
      credit: this.note.credit,
      initialData: this.note.initialData == 0 ? '' : this.note.initialData,
      finalData: this.note.finalData == 0 ? '' : this.note.finalData,
      discount: this.note.discount == 0 ? '' : this.note.discount,
      discountDescription: this.note.discountDescription,
      arrival: this.note.arrival,
      load: this.note.load,
      departure: this.note.departure
    });
  }

  getClient(clientId: number) : void {
    this.clientService.getClient(clientId).subscribe({
      next: response => {
        this.client = response
      },
      error: err => {
        this.errorMessage = err
      }
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: data => {
        this.employeeList = data.employeeList;
        this.loadFromPathParams();
      },
      error: err => this.errorMessage = err
    });
  }

  onInitialData(): void {
    const initial = Number(this.noteForm.get("initialData")?.value)
    const final = Number(this.noteForm.get("finalData")?.value)
    const discount = Number(this.noteForm.get("discount")?.value)

    if (final != 0) {
      if (initial >= final) {
        // this.noteForm.get("noteInitialData")?.setErrors({invalidinitialdata: true})
        alert("Lectura Final no puede ser mayor o igual a Lectura Final")
        this.total = 0;
        this.totalData = 0;
        return
      }
      this.calculateTotal(initial, final, discount)
    }
  }

  onFinalData():void {
    const initial = Number(this.noteForm.get("initialData")?.value)
    const final = Number(this.noteForm.get("finalData")?.value)
    const discount = Number(this.noteForm.get("discount")?.value)

    if (final <= initial) {
      alert("Lectura Final no puede ser menor o igual a Lectura Inicial")
      this.total = 0;
      this.totalData = 0;
      return
    }
      this.calculateTotal(initial, final, discount)
  }

  onNoteDiscount(): void {
    const initial = Number(this.noteForm.get("initialData")?.value)
    const final = Number(this.noteForm.get("finalData")?.value)
    const discount = Number(this.noteForm.get("discount")?.value)

    if (!(isNaN(initial) && isNaN(final)) && (initial != 0 && final != 0)) {
      this.calculateTotal(initial, final, discount)
    } else {
      console.log("initial and final are not valid")
    }
  }

  calculateTotal(initial: number, final:number, discount: number): void {
    this.totalData = !isNaN(discount) ? final - (initial + discount) : final - initial;
    this.total = this.totalData * this.client.clientPrice;
  }

  onChangeEmployee(): void {
    this.selectedEmployee = this.noteForm.get('noteEmployee')?.value
  }

  deleteNote(): void {
    if (this.selectedEmployee && this.selectedEmployee.blockId != 0) {
      this.router.navigateByUrl(`/empleados/${this.selectedEmployee.employeeId}/bloques/${this.selectedEmployee.blockId}/eliminar`)
    } else {
      this.errorMessage = "Error en la selección del chofer y la nota a eliminar";
    }
  }
}
