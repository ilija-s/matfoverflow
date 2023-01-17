import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit{
  
  @Input()
  public user: User | null  = null;
  public isLogin: boolean = true;
  
  ngOnInit(): void {
    console.log(this.user);
  }

  switchBetweenLoginAndRegistration(): void {
    this.isLogin = !this.isLogin;
  }

}
