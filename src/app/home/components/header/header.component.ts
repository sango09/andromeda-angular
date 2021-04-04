import {I18nService} from '../../../core/services/i18n.service';
import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'ngx-i18n';
  locale: any[];

  constructor(
    translate: TranslateService,
    private i18nService: I18nService) {
    translate.setDefaultLang('es');
    translate.use('es');
    this.locale = [
      {name: 'Español', code: 'es'},
      {name: 'English', code: 'en'},
    ];
  }

  changeLocale(event: any) {
    this.i18nService.changeLocale(event.value.code);
  }

  ngOnInit(): void {
  }

}
