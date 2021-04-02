import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../../core/services/users/users.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  urlParams: any = {};
  error;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.urlParams.token = this.route.snapshot.queryParamMap.get('token');
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      token: [''],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      new_password_confirmation: ['', [Validators.required]]
    });
  }


  newPassword(event: Event) {
    event.preventDefault();
    const data = this.form.value;
    data.token = this.urlParams.token;
    this.usersService.resetPassword(data)
      .subscribe(res => this.router.navigateByUrl('/login'), error => this.error = error);
  }
}
