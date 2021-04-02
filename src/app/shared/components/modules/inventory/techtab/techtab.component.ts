import {Component, OnInit} from '@angular/core';
import {InventarioService} from '../../../../../core/services/modules/inventory/inventario.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-ver-ficha',
  templateUrl: './techtab.component.html',
  styleUrls: ['../../../../../../assets/css/dashboard/dashboard.css']
})
export class TechtabComponent implements OnInit {
  id: string;
  techTab;
  marca: string;

  constructor(
    private inventarioService: InventarioService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.fetchTechTabs();
    });
  }

  fetchTechTabs() {
    this.inventarioService.getAllFichaTecnica(this.id)
      .subscribe(res => this.techTab = res, error => console.error(error));
  }
}


