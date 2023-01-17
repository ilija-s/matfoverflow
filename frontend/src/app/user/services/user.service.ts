import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly urls = {
    patchUser: "http://localhost:3000/users/",
  }

  constructor(private http: HttpClient,
              private jwtService: JwtService,
              private authService: AuthService) { }

  public patchUserData(username: string, email: string, name: string): Observable<User> {
    const body = {username, email, name};
    console.log(body);
    console.log(this.jwtService.getToken());
    const headers: HttpHeaders = new HttpHeaders().append("Authorization", `Bearer ${this.jwtService.getToken()}`);

    return this.http.patch<{token: string}>(this.urls.patchUser, body, {headers}).pipe(
        tap((response: {token: string}) => {this.jwtService.setToken(response.token); console.log(response.token)}),
        map((response: {token: string}) => this.authService.sendUserDataIfExists()!)
    )
  }

}
