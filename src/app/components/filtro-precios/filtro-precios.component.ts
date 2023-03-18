import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { IRubro } from 'src/app/models/rubro.model';
import { AppService } from 'src/app/services/app.service';
import { ItemService } from 'src/app/services/item.service';
import { RubroService } from 'src/app/services/rubro.sevice';

@Component({
  selector: 'app-filtro-precios',
  templateUrl: './filtro-precios.component.html',
  styleUrls: ['./filtro-precios.component.css']
})
export class FiltroPreciosComponent implements OnInit, OnDestroy{

  rubros:IRubro[] = [];
  items:string[] = [];
  myControl = new FormControl('');
  filteredStreets: Observable<string[]>;
  statusSubscription:Subscription;
  @Output() rubrosChanged = new EventEmitter<IRubro[]>();
  
  
  constructor(private _rubroService:RubroService,
    private _appService:AppService, private _itemsService:ItemService)
  {
    this.statusSubscription = _appService.onSiteStatusChanged().subscribe
    (
      (value)=> {
        this.rubros = this._rubroService.getRubros();
        this.items = this._itemsService.getItemsNames();
      }
    );

    this.filteredStreets = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  ngOnInit(): void {

  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.items.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  ngOnDestroy(): void {
    if(this.statusSubscription)
    {
      this.statusSubscription.unsubscribe();
    }

    if(this.filteredStreets)
    {
      this.filteredStreets.subscribe();
    }
  } 

  onRubroClick(event:any)
  {
    let ids = event.value;
    let selectRubros = [];
    
    for(let id of ids)
    {
      for(let r of this.rubros)
      {      
        if(id === r.id)
        {
          selectRubros.push(r);
          break;
        }
      }
    }

    this.rubrosChanged.emit(selectRubros);
  }
}
