import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from "../models/user.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() user: User | null = null;
  showChangeFields : boolean;

  userForm!: FormGroup;

  constructor() {
    this.showChangeFields = false;
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z0-9_-]{4,}/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.min(2)]),
      imgUrl: new FormControl(""),
    });
  }

  public onUserFormSubmit(): void {
    const data = this.userForm.value;

    if (this.userForm.invalid){
      window.alert('Form is not valid. Please, try again!');
      return;
    }

    if(!this.user) {
      this.user = new User('','','','');
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
}
