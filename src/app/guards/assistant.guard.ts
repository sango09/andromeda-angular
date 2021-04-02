import {Injectable} from '@angular/core';
import {CanLoad, Route, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AuthService} from '../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AssistantGuard implements CanLoad {
  public route: string;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {
    this.route = this.location.path();
  }

  canLoad(route: Route): boolean {
    if (this.authService.userAssistant()) {
      return true;
    }
    this.router.navigateByUrl('/unauthorized');
    return false;
  }

}
