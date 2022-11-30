import { Component, OnInit } from '@angular/core';
import { User } from "../models/user.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user : User;
  showChangeFields : boolean;

  constructor() {
    this.user = new User("peraperic", "pera@gmail.com", "Pera Peric", "../../../assets/download.png");
    this.showChangeFields = false;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
