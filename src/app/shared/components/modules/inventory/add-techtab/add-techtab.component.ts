import {InventarioService} from '../../../../../core/services/modules/inventory/inventario.service';
import {FichaTecnicaModel} from '../../../../../core/modules/fichaTecnica.model';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-ficha',
  templateUrl: './add-techtab.component.html',
  styleUrls: ['../../../../../../assets/css/dashboard/dashboard.css']
})
export class AddTechtabComponent implements OnInit {

  ficha: FichaTecnicaModel[];
  form: FormGroup;
  selectedFile: File;
  data = new FormData();

  constructor(
    private formBuilder: FormBuilder,
    private inventarioService: InventarioService
  ) {
    this.buildForm();
  }



  private buildForm() {
    this.form = this.formBuilder.group({
      brand_implement: ['', [Validators.minLength(2), Validators.required]],
      model_implement: ['', [Validators.minLength(2), Validators.required]],
      operating_system: ['', [Validators.minLength(2), Validators.required]],
      specifications: ['', [Validators.minLength(2), Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  get brand_implementInvalid(){
    return this.form.get('brand_implement').invalid && this.form.get('brand_implement').touched;
  }

  get model_implementInvalid(){
    return this.form.get('model_implement').invalid && this.form.get('model_implement').touched;
  }
  get operating_systemInvalid() {
    return this.form.get('operating_system').invalid && this.form.get('operating_system').touched;
  }
  get specificationsInvalid() {
    return this.form.get('specifications').invalid && this.form.get('specifications').touched;
  }

  onChange(event: any) {
    if (event.target.files) {
      this.selectedFile = event.target.files[0];
      this.data.append('picture', this.selectedFile, this.selectedFile.name);
    }
  }


  ingresarFicha(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      const values = this.form;
      this.data.append('brand_implement', values.get('brand_implement').value);
      this.data.append('model_implement', values.get('model_implement').value);
      this.data.append('operating_system', values.get('operating_system').value);
      this.data.append('specifications', values.get('specifications').value);
      this.inventarioService.ingresarFicha(this.data)
        .subscribe(res => {
            Swal.fire({
              icon: 'success',
              title: 'Se ingreso correctamente la ficha tecnica',
              footer: 'Puedes cerrar esta ventana.',
            });
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: error,
              footer: 'soluciona el problema',
            });
          }
        );
    }
  }

}
