import { Component, OnInit } from '@angular/core';
import { INote } from './note';
import { NoteService } from './note.service';

@Component({
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  pageTitle: string = 'Notas';
  errorMessage = '';

  notesList: INote[] = [];
  notesNotFound = false;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() : void {
    this.noteService.getNotes().subscribe({
      next: response => this.notesList = response.notesResponse,
      error: err => {
        const emptyNotesError = "Could not fetch Notes";
        if (!err.includes(emptyNotesError)) {
          this.errorMessage = err
        } else {
          this.notesList = [];
          this.notesNotFound = true;
        }
      }
    });
  }

  deleteNote(noteId: number): void {
    this.noteService.getNote(noteId).subscribe({
      next: response => {
        if(confirm(`Seguro de proceder con el borrado de la nota "${response.note}" ?`)) {
          this.noteService.deleteNote(noteId).subscribe({
            next: () => this.loadNotes(),
            error: err => this.errorMessage = err
          })
        }
      },
      error: err => this.errorMessage = err
    });
  }

}
