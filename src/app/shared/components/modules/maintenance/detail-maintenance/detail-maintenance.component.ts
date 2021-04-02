import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {MaintenanceService} from '../../../../../core/services/modules/maintenance/maintenance.service';

@Component({
  selector: 'app-ticket-maintenance',
  templateUrl: './detail-maintenance.component.html',
  styleUrls: ['../../../../../../assets/css/dashboard/dashboard.css'],
})
export class DetailMaintenanceComponent implements OnInit {

  id: string;
  maintenance;
  iconPrint = 'pi pi-file-pdf';

  constructor(
    private maintenanceService: MaintenanceService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.fetchMaintenance();
    });
  }

  ngOnInit(): void {
  }

  fetchMaintenance(): void {
    this.maintenanceService.getMaintenance(this.id)
      .subscribe(res => this.maintenance = res, error => console.error(error));
  }

  print(event: Event) {
    event.preventDefault();
    window.print();
  }
}
