import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CleaningTank } from './cleaning-tank';
import { ClientService } from './client.service';

@Component({
  selector: 'xj-next-clean',
  templateUrl: './next-clean.component.html',
  styleUrls: ['./next-clean.component.css']
})
export class NextCleanComponent implements OnInit {
  pageTitle = "Historial de Lavado!"
  @Input() clientId: number = 0;
  cleaningTank: CleaningTank[] = []
  errorMessage = ''

  constructor(private route:ActivatedRoute,
     private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClientCleaningTankDates(this.clientId);
  }

  getClientCleaningTankDates(clientId: number) {
    this.clientService.getClientCleaningTankRecord(clientId).subscribe({
      next: response => {
        this.cleaningTank = response.cleaningTank;
      },
      error: err => this.errorMessage = err
    });
  }

  deleteCleaningTank(cleaningTankId: number) {
    if (confirm(`Seguro de proceder con el borraro 
    del registro de lavado de tanque #${cleaningTankId}`)) {
      this.clientService.deleteCleaningTankRecord(this.clientId, cleaningTankId)
      .subscribe({
        next: () => {
          this.getClientCleaningTankDates(this.clientId);
        },
        error: err => this.errorMessage = err
      })
    }
  }

}
