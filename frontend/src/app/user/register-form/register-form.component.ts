import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  sub: Subscription = new Subscription();
  registerForm: FormGroup

  constructor(private authService: AuthService) { 
    this.registerForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.pattern(/^[0-9a-zA-z_-]{4,}$/)]),
      password: new FormControl("", [Validators.required, Validators.pattern(/^[0-9a-zA-z_!@#$%^&*()+=]{5,}$/)]),
      name: new FormControl("", [Validators.required, Validators.min(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      course: new FormControl("", [Validators.required, Validators.min(1)]),
    });
   }
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public register(): void {
    if (this.registerForm.invalid) {
      window.alert("Not valid!");
      return;
    }
    const data = this.registerForm.value;
    const obs: Observable<User | null> = this.authService.register(data.username, data.password, data.email, data.name, data.course);

    this.sub = obs.subscribe((user: User | null) => {
      console.log(user)
    },
    (error : string) => 
    {
      alert("Username already exists!");
    });
  }

  public usernameHasErrors(): boolean {
    const errors: ValidationErrors | undefined | null = this.registerForm.get("username")?.errors;

    console.log(errors);

    return errors != null;
  }

  public nameHasErrors(): boolean {
    const errors: ValidationErrors | undefined | null = this.registerForm.get("name")?.errors;

    console.log(errors);

    return errors != null;
  }

  public emailHasErrors(): boolean {
    const errors: ValidationErrors | undefined | null = this.registerForm.get("email")?.errors;

    console.log(errors);

    return errors != null;
  }

  public passwordHasErrors(): boolean {
    const errors: ValidationErrors | undefined | null = this.registerForm.get("password")?.errors;

    console.log(errors);

    return errors != null;
  }

  public courseHasErrors(): boolean {
    const errors: ValidationErrors | undefined | null = this.registerForm.get("course")?.errors;

    console.log(errors);

    return errors != null;
  }

}
