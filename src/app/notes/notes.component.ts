import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  pageTitle: string = 'Notas';

  constructor() { }

  ngOnInit(): void {
  }

}
