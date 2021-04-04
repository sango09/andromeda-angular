import {Component, OnInit} from '@angular/core';
import {MaintenanceService} from '../../../../../core/services/modules/maintenance/maintenance.service';
import {InventarioService} from '../../../../../core/services/modules/inventory/inventario.service';
import {ImplementModel} from '../../../../../core/modules/implement.model';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-ticket-maintenance',
  templateUrl: './ticket-maintenance.component.html',
  styleUrls: ['../../../../../../assets/css/dashboard/dashboard.css'],
})
export class TicketMaintenanceComponent implements OnInit {

  iconPrint = 'pi pi-print';
  ticket: any;
  date: number = Date.now();
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  implementSelected: ImplementModel;
  environment = environment.url_api;
  loading = true;
  notFound = false;

  constructor(
    private maintenanceService: MaintenanceService,
    private inventarioService: InventarioService,
  ) {
  }

  ngOnInit(): void {
    this.ticket = this.maintenanceService.getTicketMaintenanceInformation();
    if (this.ticket) {
      this.inventarioService.getInventory(this.ticket.implement)
        .subscribe(res => {
          this.implementSelected = res;
          this.loading = false;
        }, error => {
          this.notFound = true;
          console.error(error);
        });
    }
  }

  print(event: Event) {
    event.preventDefault();
    window.print();
  }
}
