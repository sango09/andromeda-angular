import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  error = '';
  verify = localStorage.getItem('userInfo-statusEmail');
  iconLogin = 'none';
  disabled = false;

  constructor(private auth: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  get emailInvalid() {
    return this.form.get('email').hasError('pattern') && this.form.get('email').touched;
  }

  get emailIsEmpty() {
    return this.form.get('email').hasError('required') && this.form.get('email').touched;
  }

  get passwordInvalid() {
    return this.form.get('password').hasError('required') && this.form.get('password').touched;
  }


  login(event: Event) {
    this.iconLogin = 'pi pi-spin pi-spinner';
    this.disabled = true;
    event.preventDefault();
    if (this.form.valid) {
      const user = this.form.value;
      this.auth.login(user)
        .subscribe(userAuth => {
          this.iconLogin = 'none';
          this.disabled = false;
          if (userAuth.user.is_admin) {
            this.router.navigate(['./admin']);
          } else if (userAuth.user.is_employee) {
            this.router.navigate(['./empleado']);
          } else if (userAuth.user.is_assistant) {
            this.router.navigate(['./auxiliar']);
          } else {
            this.error = 'Este usuario no hace parte del sistema';
          }
        }, error => {
          this.error = error;
          this.iconLogin = 'none';
          this.disabled = false;
        });
    } else {
      this.iconLogin = 'none';
      this.disabled = false;
      Object.values(this.form.controls).forEach(control => control.markAllAsTouched());
    }
  }
}
