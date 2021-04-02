import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from '../services/token/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addToken(req);
    return next.handle(req);
  }

  private addToken(req: HttpRequest<any>) {
    const token = this.tokenService.getToken();
    if (token) {
      const Authorization = `token ${this.tokenService.getToken()}`;
      req = req.clone({
        setHeaders: {
          Authorization,
        },
      });
      return req;
    }
    return req;
  }
}
