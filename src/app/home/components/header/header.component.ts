import {I18nService} from '../../../core/services/i18n.service';
import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../home/home.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'ngx-i18n';

  constructor(
    translate: TranslateService,
    private i18nService: I18nService) {
    translate.setDefaultLang('es');
    translate.use('es');
  }

  changeLocale(locale: string) {
    this.i18nService.changeLocale(locale);
  }

  ngOnInit(): void {
  }

}
