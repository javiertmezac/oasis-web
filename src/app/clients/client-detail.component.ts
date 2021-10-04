import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  pageTitle: string = 'Editar Empresa';

  constructor(private route: ActivatedRoute,
              private router: Router) {

    const clientId = Number(this.route.snapshot.paramMap.get('id'));
    if (clientId && clientId != 0) {
      console.log('Client Detail Id: ', clientId)
      this.pageTitle = this.pageTitle + ": " + clientId;
    } else {
      this.pageTitle = 'Agregar Empresa'
    }
  }

  ngOnInit(): void {
  }

  onBack(): void {
    this.router.navigate(['/empresas']);
  }

  onSave(): void {
    alert('save not implemented yet!');
  }
}
