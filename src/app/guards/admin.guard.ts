import {Injectable} from '@angular/core';
import {CanLoad, Route, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AuthService} from '../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  public userInfo: string;
  public route: string;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {
    this.route = this.location.path();
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  canLoad(route: Route): boolean {
    if (this.authService.userAdmin()) {
      return true;
    }
    this.router.navigateByUrl('/unauthorized');
    return false;

  }

}
