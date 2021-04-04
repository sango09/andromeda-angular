import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../../../core/services/users/users.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {NewProfileModel, ProfileModel} from '../../../../../core/modules/profile.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../../../../../../assets/css/dashboard/dashboard.css'],
  providers: [MessageService, ConfirmationService]
})


export class UsersComponent implements OnInit {
  profiles: ProfileModel[];
  loading = true;
  profile: ProfileModel;
  userRegister: NewProfileModel;
  selectedUsers = [];
  user = JSON.parse(localStorage.getItem('userInfo'));
  userDialog: boolean;
  newUserDialog: boolean;
  selectedValue: string;
  error: string;
  form: FormGroup;
  userForm: FormGroup;
  urlPdf = 'https://andromedapi.tech/pdf/report/user/';
  private loadingPDF = false;
  disabled = false;
  iconRegister = 'none';


  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.buildForm();
    this.buildUserForm();
  }

  ngOnInit(): void {
    this.getAllusers();
  }

  get emailInvalid() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get passwordInvalid() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  get confirmPasswordInvalid() {
    const password1 = this.form.get('password').value;
    const password2 = this.form.get('password_confirmation').value;
    return (password1 !== password2);
  }

  get firstNameInvalid() {
    return this.form.get('first_name').invalid && this.form.get('first_name').touched;
  }

  get lastNameInvalid() {
    return this.form.get('last_name').invalid && this.form.get('last_name').touched;
  }

  get checkboxIsEmpty() {
    return this.form.get('terms').hasError('required') && this.form.get('terms').touched;
  }

  markAsTouched(): void {
    Object.values(this.form.controls).forEach(control => control.markAllAsTouched());
  }


  private buildForm() {
    this.form = this.formBuilder.group({
      first_name: ['', [Validators.minLength(2), Validators.required]],
      last_name: ['', [Validators.minLength(2), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      username: ['', [Validators.email]],
      password: ['', [Validators.minLength(8), Validators.required]],
      password_confirmation: ['', [Validators.minLength(8), Validators.required]],
      rol: ['', [Validators.required]],
      is_admin: [false],
      is_employee: [false],
      is_assistant: [false],
    });
  }

  private buildUserForm() {
    this.userForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.minLength(2), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      is_active: ['', [Validators.required]],
      is_admin: [false],
      is_employee: [false],
      is_assistant: [false]
    });
  }

  getAllusers() {
    this.usersService.getAllUsers()
      .subscribe(res => {
        this.profiles = res;
        this.loading = false;
      });

  }


  userModal() {
    this.profile = {};
    this.userRegister = {};
    this.newUserDialog = true;
  }

  hideDialog() {
    this.userDialog = false;
    this.newUserDialog = false;
  }

  editUser(profile: ProfileModel, event: Event) {
    event.preventDefault();
    this.profile = {...profile};
    if (this.profile.is_employee) {
      this.selectedValue = 'Empleado';
    } else if (this.profile.is_assistant) {
      this.selectedValue = 'Auxiliar';
    } else if (this.profile.is_admin) {
      this.selectedValue = 'Coordinador';
    } else {
      this.selectedValue = null;
    }
    this.userDialog = true;
  }

  registerUser(event: Event) {
    event.preventDefault();
    this.iconRegister = 'pi pi-spin pi-spinner';
    this.disabled = true;
    if (this.form.valid) {
      const data = this.form.value;
      data.username = data.email;
      switch (data.rol) {
        case 'is_admin':
          data.is_admin = true;
          break;
        case 'is_employee':
          data.is_employee = true;
          break;
        case 'is_assistant':
          data.is_assistant = true;
          break;
      }
      this.authService.signup(data)
        .subscribe(res => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registrado',
            detail: 'Registro exitoso',
            life: 3000
          });
          this.newUserDialog = false;
          this.iconRegister = 'none';
          this.disabled = false;
          this.getAllusers();
        }, error => {
          this.iconRegister = 'none';
          this.disabled = false;
          this.error = error;
        });
    } else {
      this.iconRegister = 'none';
      this.disabled = false;
      this.markAsTouched();
    }
  }

  updateUser(event: Event) {
    event.preventDefault();
    const profile = this.profile;
    this.userForm.patchValue({
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      is_active: profile.is_active,
    });
    const data = this.userForm.value;
    switch (this.selectedValue) {
      case 'Coordinador':
        data.is_admin = true;
        break;
      case 'Empleado':
        data.is_employee = true;
        break;
      case 'Auxiliar':
        data.is_assistant = true;
        break;
    }
    this.usersService.updateDataUser(data, this.profile.id)
      .subscribe(res => {
        this.userDialog = false;
        this.loading = true;
        this.getAllusers();
        this.messageService.add({
          severity: 'success',
          summary: 'Usuario Actualizado',
          detail: 'Exito',
          life: 3000
        });
      }, error => console.error(error));
  }


  deleteSelectedUser(event: Event) {
    event.preventDefault();
    this.confirmationService.confirm({
      message: '¿Esta seguro de inhabilitar los usuarios seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-outlined',
      accept: () => {
        this.profiles = this.profiles.filter(value => !this.selectedUsers.includes(value));
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.selectedUsers.length; i++) {
          const id = this.selectedUsers[i].id;
          this.usersService.inactiveUser(id)
            .subscribe(res => {
              this.messageService.add({
                severity: 'success',
                summary: 'Usuarios inhabilitados',
                detail: 'Exito',
                life: 3000,
              });
              this.selectedUsers = null;
            }, error => {
              this.error = error;
            });
        }
      }
    });
  }

  deleteUser(profile: ProfileModel, event: Event) {
    event.preventDefault();
    this.confirmationService.confirm({
      message: `¿Esta seguro de inhabilitar a ${profile.first_name} ${profile.last_name}`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-outlined',
      accept: () => {
        this.usersService.inactiveUser(profile.id)
          .subscribe(res => {
            this.loading = true;
            this.getAllusers();
            this.messageService.add({
              severity: 'success',
              summary: 'Usuario inhabilitado',
              detail: 'Exito',
              life: 3000,
            });
          }, error => {
            this.error = error;
          });
      }
    });
  }

  exportExcel() {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.profiles);
      const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, 'usuariosAndromeda');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  getUsersData() {
    const users = [];
    for (const user of this.profiles) {
      user.first_name = user.first_name.toString();
      users.push(user);
    }
    return users;
  }
}
