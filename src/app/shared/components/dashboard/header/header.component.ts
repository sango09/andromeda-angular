import {I18nService} from '../../../../core/services/i18n.service';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/services/auth/auth.service';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {UsersService} from '../../../../core/services/users/users.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  avatar = JSON.parse(localStorage.getItem('userInfo'));
  id = this.avatar.id;
  imageURL: string;
  items: MenuItem[];
  locale: any[];

  constructor(
    private auth: AuthService,
    private router: Router,
    private usersService: UsersService,
    private translate: TranslateService,
    private i18nService: I18nService
  ) {
    translate.setDefaultLang('es');
    translate.use('es');
    this.locale = [
      {name: 'Español', code: 'es'},
      {name: 'English', code: 'en'},
    ];
  }


  ngOnInit(): void {
    this.usersService.getUserProfile(this.id)
      .subscribe(res => {
        this.avatar = res.profile;
        this.imageURL = `${this.avatar.picture}`;
      }, error => console.error(error));

    this.items = [
      {label: 'Mi perfil', icon: 'pi pi-user', routerLink: `perfil/${this.id}`},
      {separator: true},
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-power-off',
        command: () => {
          this.logout();
        },
        styleClass: 'logout'
      }
    ];
  }

  changeLocale(event: any) {
    this.i18nService.changeLocale(event.value.code);
  }

  openNav() {
    const toggle = document.getElementById('sidebar');
    toggle.classList.contains('toggled') ? toggle.classList.remove('toggled') : toggle.classList.add('toggled');
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
