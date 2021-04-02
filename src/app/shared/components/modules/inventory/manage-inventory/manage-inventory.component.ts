import {ProfileModel} from '../../../../../core/modules/profile.model';
import {UsersService} from '../../../../../core/services/users/users.service';
import {ImplementModel} from '../../../../../core/modules/implement.model';
import {FichaTecnicaModel} from '../../../../../core/modules/fichaTecnica.model';
import {InventarioService} from '../../../../../core/services/modules/inventory/inventario.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {ConfirmationService, MessageService} from 'primeng/api';
import {environment} from '../../../../../../environments/environment';



@Component({
  selector: 'app-gestionar-inventario',
  templateUrl: './manage-inventory.component.html',
  styleUrls: ['../../../../../../assets/css/dashboard/dashboard.css'],
  providers: [MessageService, ConfirmationService]
})
export class ManageInventoryComponent implements OnInit {

  implements: ImplementModel[];
  techTab: FichaTecnicaModel[];
  implement: ImplementModel;
  form: FormGroup;
  implementDialog: boolean;
  id: string;
  users: ProfileModel[];
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  loading = true;
  statusImplement: any[];
  urlPdf= 'https://andromedapi.tech/pdf/report/inventory/'


  constructor(
    private usersService: UsersService,
    private inventarioService: InventarioService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.fetchImplements();
    this.buildStatusImplement();
    this.fetchUsers();
    this.fetchTechTab();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(2), Validators.required]],
      category: ['', [Validators.minLength(2), Validators.required]],
      technical_data_sheet_id: ['', [Validators.required]],
      purchase_date: ['', [Validators.required]],
      price: ['', [Validators.minLength(2), Validators.required]],
      serial_number: ['', [Validators.minLength(2), Validators.required]],
      status_implement: ['', [Validators.required]],
    });
  }

  private buildStatusImplement(): void {
    this.statusImplement = [
      {value: 'Disponible'},
      {value: 'En prestamos'},
      {value: 'Mantenimiento'},
      {value: 'Nuevo ingreso'},
      {value: 'Pendiente de mantenimiento'},
      {value: 'Reserva'},
    ];
  }

  fetchUsers(): void {
    this.usersService.getAllUsers()
      .subscribe(res => this.users = res, error => console.error(error));
  }

  fetchTechTab(): void {
    this.inventarioService.getFichaTecnica()
      .subscribe(res => this.techTab = res, error => console.error(error));
  }

  fetchImplements() {
    this.inventarioService.getAllInventory()
      .subscribe(res => {
        this.implements = res;
        this.loading = false;
        console.log(res)
      }, error => console.error(error));
  }


  hideDialog(): void {
    this.implementDialog = false;
  }

  editImplement(implement: ImplementModel) {
    this.implement = {...implement};
    this.id = this.implement.id;
    this.implementDialog = true;
  }

  updateImplement(event: any) {
    event.preventDefault();
    this.form.patchValue(this.implement);
    if (this.form.valid) {
      const data = this.form.value;
      this.inventarioService.updateInventory(this.id, data)
        .subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Se edito correctamente',
            footer: 'Puedes cerrar esta ventana.',
          });
          this.fetchImplements();
          this.hideDialog();
        }, error => console.error(error));
    }
  }

  inactivateImplement(event: Event, implementID) {
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Esta seguro de inhabilitar el implemento?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.inventarioService.inactivateImplement(implementID)
          .subscribe(res => {
            Swal.fire({
              icon: 'success',
              title: 'Implemento inactivado',
            });
            this.fetchImplements();
          }, error => console.error(error));
      }
    });
  }

  exportExcel() {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.implements);
      const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, 'inventory');
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
