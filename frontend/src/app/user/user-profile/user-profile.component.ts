import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from "../models/user.model";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() user: User | null = null;
  showChangeFields : boolean;
  logOutCheck : boolean = false;
  userForm!: FormGroup;
  
  constructor(private authService : AuthService,
              private userService: UserService) {
    this.showChangeFields = false;
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl(this.user?.username, [Validators.required, Validators.pattern(/[a-zA-Z0-9_-]{4,}/)]),
      email: new FormControl(this.user?.email, [Validators.required, Validators.email]),
      name: new FormControl(this.user?.name, [Validators.required, Validators.min(2)])
    });
  }

  public onUserFormSubmit(): void {
    const data = this.userForm.value;

    console.log(this.user);

    if (this.userForm.invalid){
      window.alert('Form is not valid. Please, try again!');
      return;
    }

    this.userService.patchUserData(data.username, data.email, data.name).subscribe((user: User) => {
      if(!this.user) {
        this.user = new User('','','','');
      }
      
      this.user.username = user.username;
      this.user.email = user.email;
      this.user.name = user.name;


      this.userForm.reset({
          username: this.user.username,
          name: this.user.name,
          email: this.user.email
      });

      this.disableChangeFields();
    });
  }

  togglaChangeFields() {
    this.showChangeFields = !this.showChangeFields;
  }

  enableChangeFields() {
    this.showChangeFields = true;
  }

  disableChangeFields() {
    this.showChangeFields = false;
  }

  onChangeName(ev: Event) {
    const newName : string = (ev.target as HTMLInputElement).value;
    if(!this.user) {
      this.user = new User('','','','');
    }
    this.user.name = newName;
  }

  onChangeEmail(ev: Event) {
    const newEmail : string = (ev.target as HTMLInputElement).value;
    if(!this.user) {
      this.user = new User('','','','');
    }
    this.user.email = newEmail;
  }

  public usernameHasErrors(): boolean {
    const errors: ValidationErrors | undefined | null = this.userForm.get("username")?.errors;

    console.log(errors);

    return errors != null;
  }

  public nameHasErrors(): boolean {
    const errors: ValidationErrors | undefined | null = this.userForm.get("name")?.errors;

    console.log(errors);

    return errors != null;
  }

  public emailHasErrors(): boolean {
    const errors: ValidationErrors | undefined | null = this.userForm.get("email")?.errors;

    console.log(errors);

    return errors != null;
  }

  public logout(){
    this.authService.logout();
  }
}
