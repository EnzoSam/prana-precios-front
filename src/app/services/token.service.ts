import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './baseService.service';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AutAuthorities';

@Injectable({
  providedIn: 'root'
})

export class TokenService extends BaseService{

  roles: Array<string> = [];

  constructor(protected override _http: HttpClient)
  {
    super(_http);
  }  

  public isAuthenticated():boolean{
    let t = this.getToken();

    return t != null && t != undefined && t != '' && t != 'undefined';
  }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    let t = sessionStorage.getItem(TOKEN_KEY) ;
    if(t)
      return t.toString();
    else
      return '';
  }

  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName(): string {
    let u = sessionStorage.getItem(USERNAME_KEY);
    if(u)
      return u.toString();
    else
      return '';
  }

  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    let au = sessionStorage.getItem(AUTHORITIES_KEY);
    if (au) {

      JSON.parse(au).forEach((authority: { authority: string; }) => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }


}