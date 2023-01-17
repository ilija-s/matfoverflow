import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{
  sub: Subscription = new Subscription();
  loginForm: FormGroup;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.pattern(/^[0-9a-zA-z_-]{8,}$/)]),
      password: new FormControl("", [Validators.required, Validators.pattern(/^[0-9a-zA-z_!@#$%^&*()+=]{5,}$/)])
    });
   }
   ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.invalid) {
      window.alert('Form is not valid!');
    }

    const data = this.loginForm.value;
    const obs: Observable<User | null> = this.authService.login(data.username, data.password);

    this.sub = obs.subscribe((user: User | null) => {
      console.log(user)
    });

    this.authService.login(data.username, data.password);
  }

}
