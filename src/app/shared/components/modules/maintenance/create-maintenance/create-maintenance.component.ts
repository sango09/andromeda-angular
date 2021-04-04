import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MaintenanceService} from '../../../../../core/services/modules/maintenance/maintenance.service';
import {InventarioService} from '../../../../../core/services/modules/inventory/inventario.service';
import {formatDate} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-maintenance',
  templateUrl: './create-maintenance.component.html',
  styleUrls: ['../../../../../../assets/css/dashboard/dashboard.css']
})
export class CreateMaintenanceComponent implements OnInit {

  form: FormGroup;
  selectedFile: File;
  data = new FormData();
  userData = JSON.parse(localStorage.getItem('userInfo'));
  userFullName = `${this.userData.first_name} ${this.userData.last_name}`;
  implements: any;
  selectImplement: any;
  typeMaintenance: any[];
  dates: Date;
  invalidDates: Array<Date>;
  value: Date;
  date: string;
  imageFile;

  constructor(
    private formBuilder: FormBuilder,
    private maintenanceService: MaintenanceService,
    private inventoryService: InventarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.builForm();
  }

  ngOnInit(): void {
    this.getAllImplements();
    const today = new Date();
    const invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
    this.typeMaintenance = [
      {name: 'Preventivo'},
      {name: 'Correctivo'}
    ];
  }

  private builForm() {
    this.form = this.formBuilder.group({
      maintenance_location: ['', Validators.required],
      description: ['', Validators.required],
      maintenance_type: ['', Validators.required],
      implement: ['', Validators.required],
      maintenance_date: ['', Validators.required],
    });
  }

  get implementIsEmpty() {
    return this.form.get('implement').invalid && this.form.get('implement').touched;
  }

  get typeMaintenaceIsEmpty() {
    return this.form.get('maintenance_type').invalid && this.form.get('maintenance_type').touched;
  }

  get dateIsEmpty() {
    return this.form.get('maintenance_date').invalid && this.form.get('maintenance_date').touched;
  }

  get locationIsEmpty() {
    return this.form.get('maintenance_location').invalid && this.form.get('maintenance_location').touched;
  }

  get descriptionIsEmpty() {
    return this.form.get('description').invalid && this.form.get('description').touched;
  }

  getAllImplements() {
    this.inventoryService.getAllInventory()
      .subscribe(res => this.implements = res, error => console.error(error));
  }

  getFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      this.data.append('image_implement', this.selectedFile, this.selectedFile.name);
    }
  }

  createMaintenance() {
    if (this.form.valid) {
      const value = this.form.value;
      this.data.append('maintenance_date', formatDate(value.maintenance_date, 'yyyy-MM-dd HH:mm:ss', 'en-US'));
      this.data.append('maintenance_location', value.maintenance_location);
      this.data.append('description', value.description);
      this.data.append('maintenance_type', value.maintenance_type);
      this.data.append('implement', value.implement);
      this.maintenanceService.createMaintenance(this.data)
        .subscribe(res => {
            this.maintenanceService.ticketInformation = res;
            const nextStep = this.router.createUrlTree(['../ticket'], {relativeTo: this.route});
            this.router.navigateByUrl(nextStep);
          },
          error => console.error(error));
    } else {
      Object.values(this.form.controls).forEach(control => control.markAllAsTouched());
      console.log(this.form.value);
    }
  }

}
