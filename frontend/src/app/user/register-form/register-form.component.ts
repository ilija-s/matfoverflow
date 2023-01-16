import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  
  registerForm: FormGroup

  constructor() { 
    this.registerForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.pattern(/^[0-9a-zA-z_-]{8,}$/)]),
      password: new FormControl("", [Validators.required, Validators.pattern(/^[0-9a-zA-z_!@#$%^&*()+=]{5,}$/)]),
      name: new FormControl("", [Validators.required, Validators.min(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      course: new FormControl("", [Validators.required, Validators.min(1)]),
    });
   }
  
  ngOnInit(): void {

  }

  public register(): void{
    
  }

}
