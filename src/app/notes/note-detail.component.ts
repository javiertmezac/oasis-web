import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { INoteBase } from './note-base';
import { NoteService } from './note.service';

@Component({
  selector: 'pm-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {

  note!: INoteBase;
  pageTitle: string = "Nota"
  errorMessage! : string;

  constructor(private noteService: NoteService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let noteId = Number(this.route.snapshot.paramMap.get("id"));
    this.noteService.getNote(noteId).subscribe({
      next: response => this.note = response,
      error: err =>  {
        this.errorMessage = err
      }
    });
  }

}
