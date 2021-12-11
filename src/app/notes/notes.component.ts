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
  private _listFilter = '';

  filteredNotes: INote[] = [];
  notesList: INote[] = [];
  notesNotFound = false;
  selectPaidNotes = false;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredNotes = this.performFilter(value);
  }

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() : void {

    this.notesList = [];

    this.noteService.getNotes(this.selectPaidNotes).subscribe({
      next: response => {
        this.notesList = response.notesResponse;
        this.filteredNotes = this.notesList;
      },
      error: err => {
        const emptyNotesError = "Could not fetch Notes";
        if (!err.includes(emptyNotesError)) {
          this.errorMessage = err
        } else {
          this.filteredNotes = [];
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
            error: err => {
              if (err.includes("401 Unauthorized")) {
                this.errorMessage = "NO tiene permisos de ADMINISTRADOR para borrar!"
              } else {
                this.errorMessage = err;
              }
            }
          })
        }
      },
      error: err => this.errorMessage = err
    });
  }

  fetchPaidNotes(e: any): void {
    this.selectPaidNotes = !this.selectPaidNotes;
    this.pageTitle = this.selectPaidNotes == false ? "Notas" : "Notas Pagadas";
    this.loadNotes();
  }

  performFilter(filterBy: string): INote[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.notesList.filter(
      (note: INote) => note.note.toLocaleLowerCase().includes(filterBy)
    )
  }

}
