import { Component, OnInit} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IClient } from '../clients/client';
import { ReportService } from '../reports/report.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  errorMessage = ''
  chart: any = []
  chartData: Number[] = []
  clients: IClient[] = []

  btnDisplay = 'Ver Listado'
  toggle = false

  constructor(private reportService: ReportService) {
    Chart.register(...registerables)
   }

  ngOnInit() : void {
    this.getNoRecentOrderReport();
  }

  getNoRecentOrderReport() {
    this.reportService.getNoRecentOrderReport().subscribe({
      next: response => {
        let noOrder = response.totalClientsNotRecentOrders;
        let yesOrder: number = response.totalClients - noOrder;
        this.chartData.push(yesOrder)
        this.chartData.push(noOrder)

        this.clients = response.clients;

        this.loadChart()
      },
      error: err => this.errorMessage = err
    })
  }

  toggleDisplayNoRecentOrderReport() {
    this.toggle = !this.toggle;
    if (this.toggle == true) {
      this.btnDisplay = "Ocultar Listado"
    }
  }

  loadChart() {
    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: ['Pedidos en los últimos 30 días', 'Sin pedidos recientes'],
        datasets: [
          {
            data: this.chartData,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderWidth: 1
          }
        ]
      }
    });
  }
}
