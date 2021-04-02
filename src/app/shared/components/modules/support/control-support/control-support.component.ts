import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SupportService} from '../../../../../core/services/modules/support/support.service';
import {formatDate} from '@angular/common';
import Swal from 'sweetalert2';
import {EmployeeService} from '../../../../../core/services/employee/employee.service';
import {AssistantsService} from '../../../../../core/services/assistants/assistants.service';


@Component({
  selector: 'app-control-support',
  templateUrl: './control-support.component.html',
  styleUrls: ['../../../../../../assets/css/dashboard/dashboard.css'],
  providers: [MessageService, ConfirmationService]
})
export class ControlSupportComponent implements OnInit {

  supports: any;
  loading = true;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  now: number;
  date: string;
  iconPrint = 'pi pi-file-pdf';
  urlPdf: string;
  displayModal = false;
  supportID: string;
  rating;
  comments;
  private loadingPDF = false;

  constructor(
    private supportService: SupportService,
    private employeeService: EmployeeService,
    private assistantsService: AssistantsService,
    private confirmationService: ConfirmationService,
  ) {
  }

  ngOnInit(): void {
    this.fetchSupports();
  }


  fetchSupports() {
    if (this.userInfo.is_employee) {
      this.employeeService.getRequestServices(this.userInfo.employee.id)
        .subscribe(res => {
          this.supports = res.support_request;
          this.loading = false;
        }, error => console.error(error));
    } else if (this.userInfo.is_assistant) {
      this.assistantsService.getServicesAssigned(this.userInfo.assistant.id)
        .subscribe(res => {
          this.supports = res.supports_assigned;
          this.loading = false;
          console.log(this.supports);
        }, error => console.error(error));
    } else {
      this.getAllSupports();
    }
    this.urlPdf = 'https://andromedapi.tech/pdf/report/support/';
  }

  getAllSupports() {
    this.supportService.getAllSupports()
      .subscribe(res => {
        this.supports = res;
        this.loading = false;
      }, error => console.error(error));
  }

  completed(event: Event, id) {
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.target,
      message: '¿El soporte tecnico fue completado exitosamente?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      acceptButtonStyleClass: 'p-button-success',
      accept: () => {
        this.now = Date.now();
        this.date = formatDate(this.now, 'yyyy-MM-dd HH:mm:ss', 'en-US');
        const data = {
          is_active: false,
          complete_support_date: this.date,
        };
        this.supportService.updateSupport(id, data)
          .subscribe(res => {
              Swal.fire({
                icon: 'success',
                title: 'Soporte Tecnico completado exitosamente',
              });
              this.fetchSupports();
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
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Esta seguro de cancelar este soporte tecnico?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      header: 'Confirmación',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.supportService.deleteSupport(id)
          .subscribe(res => {
              Swal.fire({
                icon: 'success',
                title: 'Servicio Cancelado',
              });
              this.fetchSupports();
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

  printReport() {
    this.loadingPDF = true;
    if (this.loadingPDF) {
      this.iconPrint = 'pi pi-spin pi-spinner';
      setTimeout(() => {
        this.iconPrint = 'pi pi-file-pdf';
      }, 10000);
    }
  }

  rateSupport(event: Event) {
    event.preventDefault();
    const data = {
      rating: this.rating,
      comments: this.comments
    };
    this.supportService.rideSupport(this.supportID, data)
      .subscribe(res => {
        Swal.fire({
          icon: 'success',
          title: 'Gracias por calificar el Soporte Tecnico'
        });
        this.fetchSupports();
      }, error => {
        Swal.fire({
          icon: 'error',
          title: error
        });
      });
    this.hideDialog();
  }

  showModelRate(event: Event, supportID) {
    this.supportID = supportID;
    this.displayModal = true;
  }

  hideDialog() {
    this.displayModal = false;
  }
}

