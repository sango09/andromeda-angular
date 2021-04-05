import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../core/services/users/users.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  message: string;
  icon = 'none';
  disabled = false;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      full_name: ['', Validators.required],
      from_email: ['', [Validators.email, Validators.required]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }


  // Getters -> Validar formulario
  get emailInvalid() {
    return this.form.get('from_email').invalid && this.form.get('from_email').touched;
  }

  get fullNameIsEmpty() {
    return this.form.get('full_name').hasError('required') && this.form.get('full_name').touched;
  }

  get subjectIsEmpty() {
    return this.form.get('subject').hasError('required') && this.form.get('subject').touched;
  }

  get messageIsEmpty() {
    return this.form.get('message').hasError('required') && this.form.get('message').touched;
  }


  contactFormSubmit() {
    this.icon = 'pi pi-spin pi-spinner';
    this.disabled = true;
    if (this.form.valid) {
      this.usersService.contactAndromeda(this.form.value)
        .subscribe(response => {
          this.icon = 'none';
          this.disabled = false;
          Swal.fire({
            icon: 'success',
            title: response['message']
          });
        }, error => {
          this.icon = 'none';
          this.disabled = false;
          console.error(error);
        });
    } else {
      this.icon = 'none';
      this.disabled = false;
      Object.values(this.form.controls).forEach(control => control.markAllAsTouched());
    }
  }


}
