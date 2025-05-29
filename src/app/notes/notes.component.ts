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

  notesList: INote[] = [];
  selectPaidNotes = false;
  finishLoading = false;

  pagination = { currentPage: 0, pageSize: 20, totalPages: 0, totalItems: 0 };
  jumpToPage = 1;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
  }

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(page = 0, search = '') : void {

    this.notesList = [];

    this.noteService.getNotesV2(this.selectPaidNotes, {page, size: this.pagination.pageSize, search: search}).subscribe({
      next: response => {
        this.notesList = response.notesResponse;
        this.pagination = response.pagination;
      },
      error: err => {
        this.errorMessage = err;
      },
      complete: () => this.finishLoading = true
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

  performFilter() {
    let filterBy = this._listFilter.toLocaleLowerCase();
    this.loadNotes(0, filterBy);
  }

  onPageChange(newPage: number) {
    this.loadNotes(newPage, this._listFilter);
  }

  goToPage() {
    const pageIndex = this.jumpToPage - 1;

    if (
      pageIndex >= 0 &&
      pageIndex < this.pagination.totalPages
    ) {
      this.onPageChange(pageIndex);
    } else {
      alert('Invalid page number');
    }
  }

}
