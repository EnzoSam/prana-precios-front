import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPrecioItem } from '../models/precioItem.model';
import { BaseService } from './baseService.service';

@Injectable({
  providedIn: 'root'
})
export class PrecioService extends BaseService{

  constructor(protected override _http: HttpClient)
  {
    super(_http);
  }  

  newPrecioItem()
  {

  }

  getPrices():Observable<IPrecioItem[]>
  {
    return this._http.get<IPrecioItem[]>
    (this.apiUrl + "precios",{headers:this.headers});
  }

  getPricesCache()
  {
     let s = localStorage.getItem('prices');
     if(s == null)
        return [];
    else
      return JSON.parse(s);
  }

  cachPrices(prices: IPrecioItem[])
  {
    localStorage.setItem('prices', JSON.stringify(prices));
  }
}
