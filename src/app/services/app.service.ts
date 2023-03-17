import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../envirorments/envirorments';
import { IStatus } from '../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiUrl:string;
  headers;
  private portfolioPerson: any = new BehaviorSubject<any>(undefined);
  private siteStatus: any = new BehaviorSubject<any>(undefined);

  constructor(private _http: HttpClient) { 
    this.apiUrl = environment.baseApiUrl;
    this.headers = new HttpHeaders().set('Content-Type','application/json');    
  }


  onSiteStatusChanged(): Observable<IStatus>
  {
    return this.siteStatus.asObservable();
  }

  setNewState(state:IStatus):void
  {
    this.siteStatus.next(state);
  }

  pricesChanged():void
  {
    let status = {
      ok:true,
      data:undefined
    }
    this.siteStatus.next(status);
  }  

}