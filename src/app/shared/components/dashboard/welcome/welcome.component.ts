import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['../../../../../assets/css/dashboard/dashboard.css']
})
export class WelcomeComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('userInfo'));
  fullName = `${this.user.first_name} ${this.user.last_name}`;

  constructor() {
  }

  ngOnInit(): void {
  }
}
