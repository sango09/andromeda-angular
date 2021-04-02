import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../../core/services/users/users.service';

@Component({
  selector: 'app-send-email-password',
  templateUrl: './send-email-password.component.html',
  styleUrls: ['./send-email-password.component.css']
})
export class SendEmailPasswordComponent implements OnInit {

  form: FormGroup;
  successSendEmail;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  resetPassword(event: Event) {
    event.preventDefault();
    this.usersService.sendEmailPassword(this.form.value)
      .subscribe(res => this.successSendEmail = true, error => console.error(error));
  }

}
