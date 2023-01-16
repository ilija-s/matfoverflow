import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  
  registerForm: FormGroup;
  public users : User[] = [];

  constructor(private userService : UserService) {
    this.userService.getUsers().subscribe((users : User[]) => 
      this.users = users
    );
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
  public get username(){
    return this.registerForm.get('username')?.value;
  }
  public get password(){
    return this.registerForm.get('password')?.value;
  }
  public get name(){
    return this.registerForm.get('name')?.value;
  }
  public get email(){
    return this.registerForm.get('email')?.value;
  }

  public register(data : any): void{
    this.userService.getUsers().subscribe((users : User[]) => 
    this.users = users);
    alert(this.users.length);
  }

}
