import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{

  loginForm: FormGroup;
  username : string = '';
  password : string = '';
  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.pattern(/^[0-9a-zA-z_-]{8,}$/)]),
      password: new FormControl("", [Validators.required, Validators.pattern(/^[0-9a-zA-z_!@#$%^&*()+=]{5,}$/)])
    });
   }

  ngOnInit(): void {
  }

  public usernameHasErrors(): boolean {
    const errors: ValidationErrors | undefined | null = this.loginForm.get("username")?.errors;

    console.log(errors);

    return errors != null;
  }

  public passwordHasErrors(): boolean {
    const errors: ValidationErrors | undefined | null = this.loginForm.get("password")?.errors;

    console.log(errors);

    return errors != null;
  }

  public login(): void {
    
  }

}
