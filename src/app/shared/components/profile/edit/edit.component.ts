import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../../environments/environment';
import {UpdateService} from '../../../../core/services/update/update.service';
import {Router} from '@angular/router';
import {UsersService} from '../../../../core/services/users/users.service';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit.component.html',
  styleUrls: ['../../../../../assets/css/dashboard/dashboard.css']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  user = JSON.parse(localStorage.getItem('userInfo'));
  idUser = this.user.id;
  selectedFile: File;
  status = environment.status;
  data = new FormData();
  changePasswordForm: FormGroup;
  messages: Message[];
  avatar: string;
  imgTemp: any = '';
  activeState: boolean[] = [false];

  constructor(
    private formBuilder: FormBuilder,
    private update: UpdateService,
    private router: Router,
    private usersService: UsersService,
  ) {
    this.buildForm();
    this.passwordForm();
  }


  ngOnInit(): void {
    this.usersService.getUserProfile(this.idUser)
      .subscribe(res => {
        this.avatar = res.profile.picture;
      }, error => console.error(error));
  }


  private buildForm() {
    this.form = this.formBuilder.group({
      first_name: [`${this.user.first_name}`, Validators.required],
      last_name: [`${this.user.last_name}`, Validators.required],
      email: [`${this.user.email}`, [Validators.email, Validators.required]],
    });
  }

  private passwordForm() {
    this.changePasswordForm = this.formBuilder.group({
      email: [`${this.user.email}`],
      old_password: ['', [Validators.minLength(8), Validators.required]],
      new_password: ['', [Validators.minLength(8), Validators.required]],
      new_password_confirmation: ['', [Validators.minLength(8), Validators.required]],
    });
  }

  get emailInvalid() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get passwordInvalid() {
    return this.changePasswordForm.get('new_password').invalid && this.changePasswordForm.get('new_password').touched;
  }

  get confirmPasswordInvalid() {
    const password1 = this.changePasswordForm.get('new_password').value;
    const password2 = this.changePasswordForm.get('new_password_confirmation').value;
    return (password1 !== password2);
  }

  get firstNameInvalid() {
    return this.form.get('first_name').invalid && this.form.get('first_name').touched;
  }

  get lastNameInvalid() {
    return this.form.get('last_name').invalid && this.form.get('last_name').touched;
  }


  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }

  getFile(event: any) {
    if (!event.target.files) {
      return this.imgTemp = '';
    } else {
      this.selectedFile = event.target.files[0];
      this.data.append('profile.picture', this.selectedFile, this.selectedFile.name);
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.imgTemp = reader.result;
    };
  }

  updateProfile(event: any) {
    event.preventDefault();
    if (this.form.valid) {
      const values = this.form;
      this.data.append('first_name', values.get('first_name').value);
      this.data.append('last_name', values.get('last_name').value);
      this.data.append('email', values.get('email').value);
      this.update.updateProfile(this.idUser, this.data)
        .subscribe(res => {
          this.messages = [
            {severity: 'success', detail: 'Tus datos han sido actualizados :)'},
          ];
          this.router.navigateByUrl(`${this.router.url}`);
        }, error => console.error(error));
    }
  }

  newPassword(event: Event) {
    event.preventDefault();
    if (this.changePasswordForm.valid) {
      const data = this.changePasswordForm.value;
      this.usersService.changePassword(data)
        .subscribe(res => {
          this.messages = [
            {severity: 'success', detail: 'Contraseña actualizada'},
          ];
          this.router.navigateByUrl(`${this.router.url}`);
        }, error => {
          this.messages = [
            {severity: 'error', detail: `${error}`},
          ];
        });
    }
  }
}
