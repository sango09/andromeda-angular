import {Injectable} from '@angular/core';
import {CanLoad, Route, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AuthService} from '../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanLoad {
  route;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {
    this.route = this.location.path();
  }

  canLoad(route: Route): boolean {
    if (this.authService.userEmployee()) {
      return true;
    }
    this.router.navigateByUrl('/unauthorized');
    return false;
  }


}
