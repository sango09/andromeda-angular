import {Component, OnInit} from '@angular/core';
import {AssistantsService} from '../../../../core/services/assistants/assistants.service';
import {MaintenanceModel} from '../../../../core/modules/maintenance';
import {SupportModel} from '../../../../core/modules/support.model';
import {LoansModel} from '../../../../core/modules/loans.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../../../assets/css/dashboard/dashboard.css'],
})
export class DashboardComponent implements OnInit {
  dataGraph: any;
  dataDoughnut: any;
  stats: any;
  services = [];
  assistants = [];
  optionsGraph: any;
  optionsDoughnut: any;
  maintenances: MaintenanceModel[];
  supports: SupportModel[];
  loans: LoansModel;
  private subscriptions: Subscription[] = [];

  constructor(
    private assistantsService: AssistantsService,
  ) {
  }

  ngOnInit(): void {
    this.dashboardData();
  }

  dashboardData() {
    this.subscriptions.push(this.assistantsService.servicesStats()
      .subscribe(res => {
        this.stats = res;
        const supports = this.stats.supports;
        const maintenances = this.stats.maintenances;
        const loans = this.stats.loans;
        this.generateDoughnut(supports, loans, maintenances);
      }, error => console.error(error))
    );
    this.subscriptions.push(this.assistantsService.getAllAssistants()
      .subscribe(res => {
        this.assistants = res;
        console.log(this.assistants);
        this.getDataGraph();
      }, error => console.error(error))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getDataGraph() {
    const supportsCompleted = this.assistants.map((e) => e.assistant.technical_support_completed);
    const loansCompleted = this.assistants.map((e) => e.assistant.loans_completed);
    const maintenanceCompleted = this.assistants.map((e) => e.assistant.maintenance_completed);
    const activeAssistants = this.assistants.map((e) => e.first_name);
    this.generateGraph(
      supportsCompleted,
      loansCompleted,
      maintenanceCompleted,
      activeAssistants
    );
  }

  generateGraph(supports, loans, maintenance, assistants) {
    this.optionsGraph = {
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
    this.dataGraph = {
      labels: assistants,
      beginAtZero: true,
      datasets: [
        {
          label: 'Soporte Tecnico',
          backgroundColor: '#00204a',
          data: supports,
        },
        {
          label: 'Prestamos Tecnologicos',
          backgroundColor: '#005792',
          data: loans
        },
        {
          label: 'Mantenimiento',
          backgroundColor: '#00bbf0',
          data: maintenance
        },
      ],
    };
  }

  generateDoughnut(support, loans, maintenance) {
    this.optionsDoughnut = {
      cutoutPercentage: 75,
    };
    this.dataDoughnut = {
      labels: ['Soporte Tecnico', 'Prestamos Tecnologicos', 'Mantenimientos'],
      datasets: [
        {
          data: [support, loans, maintenance],
          backgroundColor: [
            '#005792',
            '#f0ad4f',
            '#d9534f'
          ],
          hoverBackgroundColor: [
            '#005792',
            '#f0ad4f',
            '#d9534f'
          ]
        }]
    };
  }
}
