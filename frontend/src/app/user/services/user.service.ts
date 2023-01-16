import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users : Observable<User[]>;
  private readonly url = "http://localhost:3000/users";
  constructor(private http : HttpClient) { 
    //get all students
    this.users = this.refreshUsers();
  }
  private refreshUsers() : Observable<User[]>
  {
    this.users = this.http.get<User[]>(this.url);
    return this.users;
  }

  public getUsers() {
    return this.users;
  }
}
