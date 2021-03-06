import {Component, OnInit} from '@angular/core';
import {LoansService} from '../../../../../core/services/modules/loans/loans.service';
import {LoansModel} from '../../../../../core/modules/loans.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {EmployeeService} from '../../../../../core/services/employee/employee.service';
import {AssistantsService} from '../../../../../core/services/assistants/assistants.service';

@Component({
  selector: 'app-control-loans',
  templateUrl: './control-loans.component.html',
  styleUrls: ['../../../../../../assets/css/dashboard/dashboard.css'],
  styles: [`
    :host ::ng-deep .p-datepicker-mask {
      position: relative !important;
    }
  `
  ],
  providers: [ConfirmationService, MessageService]

})
export class ControlLoansComponent implements OnInit {
  loann: LoansModel[];
  loans: any;
  loading = true;
  selectedProducts: LoansModel[];
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  now: number;
  date: string;
  dateLoan;
  iconPrint = 'pi pi-file-pdf';
  urlPdf: string;
  loansEdit: boolean;
  form: FormGroup;
  loan;
  private loadingPDF = false;

  constructor(
    private loansService: LoansService,
    private confirmationService: ConfirmationService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private assistantsService: AssistantsService,
  ) {
  }

  ngOnInit(): void {
    this.fetchLoans();
  }


  fetchLoans() {
    if (this.userInfo.is_employee) {
      this.employeeService.getRequestServices(this.userInfo.employee.id)
        .subscribe(res => {
          this.loans = res.loans_request;
          this.loading = false;
        }, error => console.error(error));
    } else if (this.userInfo.is_assistant) {
      this.assistantsService.getServicesAssigned(this.userInfo.assistant.id)
        .subscribe(res => {
          this.loans = res.loans_assigned;
          this.loading = false;
        }, error => console.error(error));
    } else if (this.userInfo.is_admin) {
      this.getallLoans();
    }
    this.urlPdf = 'https://andromedapi.tech/pdf/report/loans/';
  }

  getallLoans() {
    this.loansService.getAllLoans()
      .subscribe(res => {
        this.loans = res;
        this.loading = false;
      }, error => console.error(error));
  }

  editLoan(loan) {
    this.loan = {...loan};
    this.dateLoan = new Date(this.loan.loans_date);
    this.loansEdit = true;
  }

  updateLoan(event: Event){
    let newData = {
      'loans_date': formatDate(this.dateLoan, 'yyyy-MM-dd HH:mm:ss', 'en-US'),
      'loans_location': this.loan.loans_location
    }
    this.loansService.updateLoan(this.loan.id, newData)
    .subscribe(res => {
      this.loansEdit = false;
      Swal.fire({
        icon: 'success',
        title: 'Prestamo actualizado',
      });
      this.fetchLoans();
    },error => {
      Swal.fire({
        icon: 'error',
        title: error,
      });
    });

  }

  completed(event: Event, id) {
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.target,
      message: '??Completo exitosamente el servicio?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      acceptButtonStyleClass: 'p-button-success',
      accept: () => {
        this.now = Date.now();
        this.date = formatDate(this.now, 'yyyy-MM-dd HH:mm:ss', 'en-US');
        const data = {
          is_active: false,
          complete_loans_date: this.date,
        };
        this.loansService.updateLoan(id, data)
          .subscribe(res => {
              Swal.fire({
                icon: 'success',
                title: 'Servicio completado exitosamente',
              });
              this.fetchLoans();
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

  canceleted(event: Event, id) {
    this.confirmationService.confirm({
      target: event.target,
      message: '??Esta seguro de cancelar este servicio?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {

        this.loansService.deleteLoan(id)
          .subscribe(res => {
              Swal.fire({
                icon: 'success',
                title: 'Servicio Cancelado',
              });
              this.fetchLoans();
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

  exportExcel() {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.loans);
      const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, 'soportesAndromeda');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

}
