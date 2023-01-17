import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { IJwtTokenData } from '../models/jwt-token-data';
import { User } from '../user/models/user.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = {
    registerUrl: "http://localhost:3000/users/",
    loginUrl: "http://localhost:3000/users/login",
  }
  private readonly userSubject: Subject<User | null> = new Subject<User | null>();
  public readonly user: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  public sendUserDataIfExists(): User | null {
    const payload: IJwtTokenData | null = this.jwtService.getDataFromToken();
    if(!payload) {
      return null;
    }

    const newUser: User =  new User(payload.username, payload.email, payload.name, payload.imgUrl);
    this.userSubject.next(newUser);
    return newUser;
  }

  public register(username: string, password: string, email: string, name: string, course: string): Observable<User | null> {
    const body = {
      username,
      password,
      email,
      name,
      course
    };
    const obs: Observable<{token: string}> = this.http.post<{token: string}>(this.url.registerUrl, body);
  
    return obs.pipe(
      tap((response: {token: string}) => this.jwtService.setToken(response.token)),
      map((response: {token: string}) => this.sendUserDataIfExists())
    )
  }

  public login(username: string, password: string): Observable<User | null> {
    const body = {
      username,
      password,
    };
    const obs: Observable<{token: string}> = this.http.post<{token: string}>(this.url.loginUrl, body);
  
    return obs.pipe(
      tap((response: {token: string}) => this.jwtService.setToken(response.token)),
      map((response: {token: string}) => this.sendUserDataIfExists())
    )
  }

  public logout() {
    this.jwtService.removeToken();
    this.userSubject.next(null);
  }
}
