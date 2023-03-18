import { Component, OnInit } from '@angular/core';
import { IPrecioItem } from 'src/app/models/precioItem.model';
import { IRubro } from 'src/app/models/rubro.model';
import { AppService } from 'src/app/services/app.service';
import { ItemService } from 'src/app/services/item.service';
import { PrecioService } from 'src/app/services/precio.service';
import { RubroService } from 'src/app/services/rubro.sevice';

@Component({
  selector: 'app-listado-precios',
  templateUrl: './listado-precios.component.html',
  styleUrls: ['./listado-precios.component.css']
})
export class ListadoPreciosComponent implements OnInit {

  precios: IPrecioItem[];
  preciosFiltered: IPrecioItem[];

  constructor(private _preciosService: PrecioService,
    private _rubroService: RubroService,
    private _appService: AppService,
    private _itemsService:ItemService) {
    this.precios = [];
    this.preciosFiltered = [];
  }
  ngOnInit(): void {
    this.sincronizePrices();
  }

  sincronizePrices() {
    this._preciosService.getPrices().subscribe(response => {
      this.precios = response;
      this._preciosService.cachPrices(this.precios);
      this._rubroService.catchRubros(this.precios);
      this._itemsService.catchItems(this.precios);
      this._appService.pricesChanged();
      this.preciosFiltered = this.precios;
    },
      error => {
        console.log(error);
        this.loadCache();
      });
  }

  loadCache() {
    this.precios = this._preciosService.getPricesCache();
    this._rubroService.catchRubros(this.precios);
    this._itemsService.catchItems(this.precios);
    this._appService.pricesChanged();
    this.preciosFiltered = this.precios;
  }

  rubrosChanged(rubros: IRubro[]) {
    if (!rubros || rubros.length == 0) {
      this.preciosFiltered = this.precios;
      return;
    }
    let pricesFilter = [];

    for (let r of rubros) {
      for (let p of this.precios) {
        if (!p.Item.Rubro)
          continue;

        if (p.Item.Rubro.id === r.id) {
          pricesFilter.push(p);
        }
      }

    }

    this.preciosFiltered = pricesFilter;
  }
}
