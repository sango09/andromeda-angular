import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SupportService} from '../../../../../core/services/modules/support/support.service';

@Component({
  selector: 'app-create-support',
  templateUrl: './create-support.component.html',
  styleUrls: ['../../../../../../assets/css/dashboard/dashboard.css'],
})
export class CreateSupportComponent implements OnInit {

  userData = JSON.parse(localStorage.getItem('userInfo'));
  userFullName = `${this.userData.first_name} ${this.userData.last_name}`;
  form: FormGroup;
  iconLoading = 'none';
  disabled = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private supportService: SupportService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      support_date: ['', Validators.required],
      support_location: ['', Validators.required],
      description_problem: ['', Validators.required]
    });
  }

  get DateIsEmpty() {
    return this.form.get('support_date').hasError('required') && this.form.get('support_date').touched;
  }

  get LocationIsEmpty() {
    return this.form.get('support_location').hasError('required') && this.form.get('support_location').touched;
  }

  get descriptionProblemIsEmpty() {
    return this.form.get('description_problem').hasError('required') && this.form.get('description_problem').touched;
  }


  createSupport(event: Event) {
    event.preventDefault();
    this.iconLoading = 'pi pi-spin pi-spinner';
    this.disabled = true;
    if (this.form.valid) {
      const data = this.form.value;
      this.supportService.createSupport(data)
        .subscribe(res => {
          this.iconLoading = 'none';
          this.disabled = false;
          this.supportService.ticketInformation = res;
          const nextStep = this.router.createUrlTree(['../ticket'], {relativeTo: this.route});
          this.router.navigateByUrl(nextStep);
        }, error => {
          console.error(error);
          this.iconLoading = 'none';
          this.disabled = false;
        });
    } else {
      this.iconLoading = 'none';
      this.disabled = false;
      Object.values(this.form.controls).forEach(control => control.markAllAsTouched());
    }
  }
}
