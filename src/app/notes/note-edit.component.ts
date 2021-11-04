import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from '../employees/employee';
import { INoteBase } from './note-base';

@Component({
  selector: 'xj-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {

  pageTitle = "Crear Nota"
  noteForm!: FormGroup;
  errorMessage = '';
  employeeList: Employee[] = []
  note!: INoteBase

  constructor(private fb: FormBuilder) {
    this.fb.group({
      noteEmployee: '',
      noteRegistration : '',
      noteCredit: '',
      noteInitialData: '',
      noteFinalData: '',
      noteDiscount: '',
      noteDiscountDescription: '',
      noteArrival: '',
      noteLoad: '',
      noteDeparture: ''
    })
   }

  ngOnInit(): void {
  }

  saveNote(): void {}

}
