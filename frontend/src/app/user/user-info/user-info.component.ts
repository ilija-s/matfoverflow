import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit{
  
  public user: User | undefined;
  public isLogin: boolean = true;
  
  ngOnInit(): void {

  }

  switchBetweenLoginAndRegistration(): void {
    this.isLogin = !this.isLogin;
  }

}
