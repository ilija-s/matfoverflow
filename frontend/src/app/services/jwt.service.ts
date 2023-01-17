import { Injectable } from '@angular/core';
import { IJwtTokenData } from '../models/jwt-token-data';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  public static readonly USER_TOKEN_ID = 'USER_JWT_TOKEN';

  constructor() { }

  public setToken(token: string): void {
    localStorage.setItem(JwtService.USER_TOKEN_ID, token);
  }

  public getToken(): string {
    const token: string | null = localStorage.getItem(JwtService.USER_TOKEN_ID);

    if (!token) {
      return '';
    }

    return token;
  }

  public removeToken(): void {
    localStorage.removeItem(JwtService.USER_TOKEN_ID);
  }

  public getDataFromToken(): IJwtTokenData | null {
    if(!this.getToken()) {
      return null;
    }

    const payload: string = this.getToken().split('.')[1];
    console.log(payload);
    const payloadJSON = Buffer.from(payload, 'base64').toString('binary');

    const jwtData: IJwtTokenData = JSON.parse(payloadJSON);

    return jwtData;
  }
}
