import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users : Observable<User[]>;
  private readonly url = "http://localhost:3000/users";
  private user$ = new BehaviorSubject<any>({});
  currentUser$ = this.user$.asObservable();
  constructor(private http : HttpClient) { 
    //get all students
    this.users = this.refreshUsers();
  }
  private refreshUsers() : Observable<User[]>
  {
    this.users = this.http.get<User[]>(this.url + "/Dusana"); //hardcoded, treba da 
                                                              //se posalje username kao parametar u fji 
    return this.users;
  }

  public getUsers() {
    return this.users;
  }

  public addNewUser(data : any) : Observable<User[]>{
    this.users = this.http.post<User[]>("http://localhost:3000/users", data);
    return this.users;
  }

  setUser(user: any) {
    this.user$.next(user);
  }

}
