import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['../login/login.component.css'],
})
export class RegistroComponent implements OnInit {
    public siteKey: string;
    public form: FormGroup;
    public error = '';
    public camp = [];
    public iconRegister = 'none';
    public disabled = false;

    constructor(
        private auth: AuthService,
        private router: Router,
        private formBuilder: FormBuilder,
    ) {
        this.buildForm();
    }


    ngOnInit(): void {
        this.siteKey = '6LfaJdEZAAAAAMVNm2no-24T409dmfMR0X8i7tdo';
        this.camp = [
            {'name': 'Administrativo', 'value': 'true'},
            {'name': 'Profesor', 'value': 'true'}
        ];
    }


    private buildForm() {
        this.form = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            username: ['', [Validators.email]],
            password: ['', [Validators.minLength(8), Validators.required]],
            password_confirmation: ['', [Validators.minLength(8), Validators.required]],
            is_employee: ['', [Validators.required]],
            terms: ['', [Validators.required]],
            recaptcha: ['', [Validators.required]]
        });
    }

    // Getters -> Validar usuario
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

    get employeeIsEmpty() {
        return this.form.get('is_employee').hasError('required') && this.form.get('is_employee').touched;
    }

    get recaptchaIsEmpty() {
        return this.form.get('recaptcha').hasError('required') && this.form.get('recaptcha').touched;
    }

    get checkboxIsEmpty() {
        return this.form.get('terms').hasError('required') && this.form.get('terms').touched;
    }

    markAsTouched(): void {
        Object.values(this.form.controls).forEach(control => control.markAllAsTouched());
    }

    showResponse() {
        this.form.get('recaptcha').setValue(true);
    }


    register(event: Event) {
        event.preventDefault();
        this.iconRegister = 'pi pi-spin pi-spinner';
        this.disabled = true;
        if (this.form.valid) {
            const data = this.form.value;
            data.username = data.email;
            data.is_employee = true;
            this.auth.signup(data)
                .subscribe((response) => {
                        this.iconRegister = 'none';
                        this.disabled = false;
                        Swal.fire({
                            icon: 'info',
                            title: 'Verifica tu correo electrónico',
                            html: `Te enviamos un correo a: ${data.email}<br>Verifícalo para iniciar sesión`,
                            footer: 'Después de verificar tu correo electrónico puedes cerrar esta ventana.',
                            willOpen: () => {
                                Swal.showLoading();
                            }
                        });
                    },
                    error => {
                        this.iconRegister = 'none';
                        this.disabled = false;
                        this.error = error;
                        Swal.close();
                    });
        } else {
            this.iconRegister = 'none';
            this.disabled = false;
            this.markAsTouched();
        }
    }
}
