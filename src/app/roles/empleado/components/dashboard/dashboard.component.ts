import {Component, OnInit} from '@angular/core';
import {LoansService} from '../../../../core/services/modules/loans/loans.service';

@Component({
  selector: 'app-dashboard-empleado',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../../../assets/css/dashboard/dashboard.css']
})
export class DashboardComponent implements OnInit {
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  data: any;
  macbook: any;
  totalRequest = this.userInfo.employee.technical_support_request + this.userInfo.employee.loans_request;


  constructor(
    private loansService: LoansService,
  ) {
    this.loansService.getImplementInventory('4')
      .subscribe(res => this.macbook = res, error => console.error(error));
    this.generateGraph();
  }

  ngOnInit(): void {
  }

  generateGraph() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        },
      ]
    };
  }
}
