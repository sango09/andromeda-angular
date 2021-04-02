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
  selectMaintenance: string;
  typeMaintenance: any[];
  dates: Date;
  invalidDates: Array<Date>;
  value: Date;
  date: string;


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
      {name: 'Preventivo', code: 'A', factor: 1},
      {name: 'Correctivo', code: 'B', factor: 2}
    ];
  }

  private builForm() {
    this.form = this.formBuilder.group({
      maintenance_location: ['', [Validators.minLength(2), Validators.required]],
      description: ['', [Validators.minLength(2), Validators.required]],
    });
  }


  getAllImplements() {
    this.inventoryService.getAllInventory()
      .subscribe(res => this.implements = res, error => console.error(error));
  }


  getFile(event: any) {
    if (event.target.files) {
      this.selectedFile = event.target.files[0];
      this.data.append('image_implement', this.selectedFile, this.selectedFile.name);
    }
  }

  createMaintenance(event: Event) {
    event.preventDefault();
    const values = this.form;
    this.date = formatDate(this.value, 'yyyy-MM-dd HH:mm:ss', 'en-US');
    this.data.append('maintenance_date', this.date);
    this.data.append('implement', this.selectImplement.id);
    this.data.append('maintenance_type', this.selectMaintenance['name']);
    this.data.append('maintenance_location', values.get('maintenance_location').value);
      this.data.append('description', values.get('description').value);
    this.maintenanceService.createMaintenance(this.data)
      .subscribe(res => {
          this.maintenanceService.ticketInformation = res;
          const nextStep = this.router.createUrlTree(['../ticket'], {relativeTo: this.route});
          this.router.navigateByUrl(nextStep);
        },
        error => console.error(error));
  }

}
