import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  public sub: Subscription;
  public user: User | null = null;
  public isLogin: boolean = true;

  constructor(private authService: AuthService) {
    this.sub = this.authService.user.subscribe((user: User | null) => {
      this.user = user;
    });
    this.authService.sendUserDataIfExists();
  }
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  switchBetweenLoginAndRegistration(): void {
    this.isLogin = !this.isLogin;
  }

}
