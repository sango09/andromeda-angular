import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../../core/services/users/users.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['../../../../../assets/css/dashboard/dashboard.css']
})
export class PerfilComponent implements OnInit {
  dataUser = JSON.parse(localStorage.getItem('userInfo'));
  enabledEdit: boolean;
  id: string;
  avatar;
  fullName: string;
  user;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    localStorage.removeItem('userInfo-statusProfile');
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.usersService.getUserProfile(this.id)
        .subscribe(res => {
          this.user = res;
          this.enabledEdit = this.user.id === this.dataUser.id;
          this.fullName = `${res.first_name} ${res.last_name}`;
          this.avatar = res.profile.picture;
        });
    });
  }

}
