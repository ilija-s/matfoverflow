import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
      username: new FormControl(this.user.username, []),
      email: new FormControl(this.user.email, []),
      name: new FormControl(this.user.name, []),
      imgUrl: new FormControl(""),
    });
  }

  public onUserFormSubmit(): void {
    const data = this.userForm.value;

    this.user.name = data.name;
    this.user.username = data.username;
    this.user.email = data.email;

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
