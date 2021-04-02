import {FichaTecnicaModel} from '../../../../../core/modules/fichaTecnica.model';
import {InventarioService} from '../../../../../core/services/modules/inventory/inventario.service';
import {ImplementModel} from '../../../../../core/modules/implement.model';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-implemento',
  templateUrl: './implement.component.html',
  styleUrls: ['../../../../../../assets/css/dashboard/dashboard.css']
})
export class ImplementComponent implements OnInit {

  inventory: ImplementModel[];
  techTabs: FichaTecnicaModel[];
  form: FormGroup;
  date: string;
  statusImplement: any[];

  constructor(
    private inventoryService: InventarioService,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }


  ngOnInit(): void {
    this.buildStatusImplement();
    this.fetchTechTabs();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(2), Validators.required]],
      category: ['', [Validators.minLength(2), Validators.required]],
      technical_data_sheet: ['', [Validators.required]],
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
      {value: 'Nuevo Ingreso'},
      {value: 'Pendiente de Mantenimiento'},
      {value: 'Reserva'},
    ];
  }

  fetchTechTabs(): void {
    this.inventoryService.getFichaTecnica()
      .subscribe(res => this.techTabs = res, error => console.error(error));
  }


  newImplement(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const data = this.form.value;
      this.date = formatDate(data.purchase_date, 'yyyy-MM-dd', 'en-US');
      data.purchase_date = this.date;
      this.inventoryService.ingresarImplemento(data)
        .subscribe(res => {
            Swal.fire({
              icon: 'success',
              title: 'Se ingreso correctamente el implemento',
              footer: 'Puedes cerrar esta ventana.',
            });
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: error.serial_number,
              footer: 'soluciona el problema',
            });
          }
        );
    }
  }

}

