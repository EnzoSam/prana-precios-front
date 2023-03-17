import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPrecioItem } from '../models/precioItem.model';
import { IRubro } from '../models/rubro.model';
import { BaseService } from './baseService.service';

@Injectable({
  providedIn: 'root'
})
export class RubroService extends BaseService{

  listRuros:IRubro[]=[];

  constructor(protected override _http: HttpClient)
  {
    super(_http);
  }  

  catchRubros(precios:any)
  {
    this.listRuros = [];

    for(let p of precios)
    {
        if(!p.Item.Rubro || p.Item.Rubro === null ||
            p.Item.Rubro === undefined)
            continue;

        let esta = false;
        for(let r of this.listRuros)
        {
            if(r.id === p.Item.Rubro.id)
            {
                esta = true;
                break;
            }
        }

        if(!esta)
        {
            this.listRuros.push(p.Item.Rubro);
        }
    }
  }

  getRubros():IRubro[]
  {
    return this.listRuros;
  }

}
