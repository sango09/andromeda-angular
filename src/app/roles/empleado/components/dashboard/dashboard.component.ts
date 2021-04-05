import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../../../core/services/employee/employee.service';

@Component({
  selector: 'app-dashboard-empleado',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../../../assets/css/dashboard/dashboard.css']
})
export class DashboardComponent implements OnInit {
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  data: any;
  information: any;
  optionsObject: any;

  constructor(
    private employeeService: EmployeeService,
  ) {
  }

  ngOnInit(): void {
    this.getInformationEmployee()
  }

  getInformationEmployee() {
    this.employeeService.statsEmployee(this.userInfo.employee.id)
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
      labels: ['Soportes', 'Soportes completados', 'Prestamos', 'Prestamos completados'],
      beginAtZero: true,
      datasets: [
        {
          label: 'Servicios',
          backgroundColor: ['#00204a', '#005792', '#00bbf0', '#005c72'],
          borderColor: '#1E88E5',
          data: [
            this.information.supports_request,
            this.information.supports_completed,
            this.information.loans_request,
            this.information.loans_completed
          ],
        },
      ],
    };
  }
}
