import {Component, OnInit} from '@angular/core';
import {AssistantsService} from '../../../../core/services/assistants/assistants.service';


@Component({
  selector: 'app-dashboard-auxiliar',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../../../assets/css/dashboard/dashboard.css']
})
export class DashboardComponent implements OnInit {
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  information: any;
  data: any;
  optionsObject: any;

  constructor(
    private assistantsService: AssistantsService
  ) {

  }

  ngOnInit(): void {
    this.getInformationAssistant();
  }

  getInformationAssistant() {
    this.assistantsService.getAssistant(this.userInfo.assistant.id)
      .subscribe(res => {
        this.information = res;
        this.generateGraph();
      }, error => console.error(error));
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
            this.information.technical_support_completed,
            this.information.maintenance_completed,
            this.information.loans_completed
          ],
        },
      ],
    };
  }
}
