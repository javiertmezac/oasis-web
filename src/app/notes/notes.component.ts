import { Component, OnInit } from '@angular/core';
import { INote } from './note';
import { NoteService } from './note.service';

@Component({
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  pageTitle: string = 'Notas';

  notesList: INote[] = []

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.getNotes().subscribe({
      next: response => this.notesList = response.notesResponse
    })
  }

}
