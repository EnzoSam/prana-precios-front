import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from '../models/item.model';
import { IPrecioItem } from '../models/precioItem.model';
import { BaseService } from './baseService.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseService{

  listItems:IItem[]=[];

  constructor(protected override _http: HttpClient)
  {
    super(_http);
  }  

  catchItems(precios:any)
  {
    this.listItems = [];

    for(let p of precios)
    {
        if(!p.Item || p.Item === null ||
            p.Item === undefined)
            continue;

        let esta = false;
        for(let i of this.listItems)
        {
            if(i.id === p.Item.id)
            {
                esta = true;
                break;
            }
        }

        if(!esta)
        {
            this.listItems.push(p.Item);
        }
    }
  }

  getItems():IItem[]
  {
    return this.listItems;
  }

  getItemsNames()
  {
    return this.listItems.map(x=>x.codigo + ' ' + x.nombre);
  }
}
