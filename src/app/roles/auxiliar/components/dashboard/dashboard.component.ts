import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-dashboard-auxiliar',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../../../assets/css/dashboard/dashboard.css']
})
export class DashboardComponent implements OnInit {
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  data: any;
  optionsObject: any;

  constructor() {
    this.generateGraph();
  }

  ngOnInit(): void {
  }

  generateGraph() {
    this.optionsObject = {
      scales: {
        yAxes: [
          {
            display: true,
            scaleLabel: {
              show: false,
            },
            ticks: {
              beginAtZero: true,
              min: 0,
              stepSize: 1,
            },
          }
        ],
      },
    };
    this.data = {
      labels: ['Soporte tecnico', 'Mantenimientos', 'Prestamos'],
      beginAtZero: true,
      datasets: [
        {
          label: 'Cantidad de servicios',
          backgroundColor: ['#00204a', '#005792', '#00bbf0'],
          borderColor: '#1E88E5',
          data: [
            this.userInfo.assistant.technical_support_completed,
            this.userInfo.assistant.maintenance_completed,
            this.userInfo.assistant.loans_completed
          ],
        },
      ],
    };
  }
}
