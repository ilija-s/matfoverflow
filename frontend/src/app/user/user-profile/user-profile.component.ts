import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from "../models/user.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user : User;
  showChangeFields : boolean;

  userForm!: FormGroup;

  constructor() {
    this.user = new User("peraperic", "pera@gmail.com", "Pera Peric", "../../../assets/download.png");
    this.showChangeFields = false;
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl(this.user.username, [Validators.pattern(/[a-zA-Z0-9_-]{8,}/)]),
      email: new FormControl(this.user.email, [Validators.email]),
      name: new FormControl(this.user.name, [Validators.min(2)]),
      imgUrl: new FormControl(""),
    });
  }

  public onUserFormSubmit(): void {
    const data = this.userForm.value;
    if (this.userForm.invalid){
      window.alert('Form is not valid. Please, try again!');
      return;
    }

    this.user.name = data.name;
    this.user.username = data.username;
    this.user.email = data.email;

    this.userForm.reset({
      username : this.user.username,
      name : this.user.name,
      email : this.user.email
    });

    this.disableChangeFields();
  }

  enableChangeFields() {
    this.showChangeFields = true;
  }

  disableChangeFields() {
    this.showChangeFields = false;
  }

  onChangeName(ev: Event) {
    const newName : string = (ev.target as HTMLInputElement).value;
    this.user.name = newName;
  }

  onChangeEmail(ev: Event) {
    const newEmail : string = (ev.target as HTMLInputElement).value;
    this.user.email = newEmail;
  }
}
