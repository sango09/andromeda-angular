import {Component, OnInit} from '@angular/core';
import {SupportService} from '../../../../../core/services/modules/support/support.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-detail-support',
  templateUrl: './detail-support.component.html',
  styleUrls: ['../../../../../../assets/css/dashboard/dashboard.css'],
})
export class DetailSupportComponent implements OnInit {

  id: string;
  support;
  iconPrint = 'pi pi-file-pdf';
  loading = true;
  notFound = false;

  constructor(
    private supportService: SupportService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.supportService.getSupport(this.id)
        .subscribe(res => {
          this.support = res;
          this.loading = false;
        }, error => {
          this.notFound = true;
          this.loading = false;
          console.error(error);
        });
    });
  }

  ngOnInit(): void {
  }

  print(event: Event) {
    event.preventDefault();
    window.print();
  }
}
