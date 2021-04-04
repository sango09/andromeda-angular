import {Component, OnInit} from '@angular/core';
import {MaintenanceService} from '../../../../../core/services/modules/maintenance/maintenance.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {formatDate} from '@angular/common';
import Swal from 'sweetalert2';
import {AssistantsService} from '../../../../../core/services/assistants/assistants.service';
import {MaintenanceModel} from '../../../../../core/modules/maintenance';

@Component({
  selector: 'app-control-maintenance',
  templateUrl: './control-maintenance.component.html',
  styleUrls: ['../../../../../../assets/css/dashboard/dashboard.css'],
  providers: [ConfirmationService, MessageService]
})
export class ControlMaintenanceComponent implements OnInit {
  maintenances: MaintenanceModel[];
  loading = true;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  now: number;
  date: string;
  urlPdf = 'https://andromedapi.tech/pdf/report/maintenance/';

  constructor(
    private maintenanceService: MaintenanceService,
    private confirmationService: ConfirmationService,
    private assistantsService: AssistantsService,
  ) {
  }

  ngOnInit(): void {
    this.fetchMaintenance();
  }

  fetchMaintenance() {
    if (this.userInfo.is_assistant) {
      this.assistantsService.getServicesAssigned(this.userInfo.assistant.id)
        .subscribe(res => {
          this.maintenances = res.maintenance_assigned;
          this.loading = false;
        }, error => console.error(error));
    } else {
      this.getAllMaintenance();
    }
  }

  getAllMaintenance() {
    this.maintenanceService.getAllMaintenance()
      .subscribe(res => {
        this.maintenances = res;
        this.loading = false;
      }, error => console.error(error));
  }


  completed(event: Event, id) {
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Completo exitosamente el mantenimiento?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      acceptButtonStyleClass: 'p-button-success',
      accept: () => {
        this.now = Date.now();
        this.date = formatDate(this.now, 'yyyy-MM-dd HH:mm:ss', 'en-US');
        const data = {
          is_active: false,
          complete_maintenance_date: this.date,
        };
        this.maintenanceService.updateMaintenance(id, data)
          .subscribe(res => {
              Swal.fire({
                icon: 'success',
                title: 'Mantenimiento completado exitosamente',
              });
              this.getAllMaintenance();
            },
            error => {
              Swal.fire({
                icon: 'error',
                title: error,
              });
            });
      }
    });
  }

  canceleted(event: Event, id) {
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Esta seguro de cancelar este mantenimiento?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.maintenanceService.deleteMaintenance(id)
          .subscribe(res => {
              Swal.fire({
                icon: 'success',
                title: 'Mantenimiento Cancelado',
              });
              this.getAllMaintenance();
            },
            error => {
              Swal.fire({
                icon: 'error',
                title: error,
              });
            });
      }
    });
  }
}
