import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth/auth.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  urlParams: any = {};
  isVerify = environment.isVerify;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.urlParams.token = this.route.snapshot.queryParamMap.get('token');
    this.auth.verify(this.urlParams).subscribe((res) => {
      this.isVerify = true;
      this.saveVerify(this.isVerify);
    }, error => console.error(error));
  }

  saveVerify(verify) {
    localStorage.setItem('userInfo-statusEmail', verify);
  }
}
