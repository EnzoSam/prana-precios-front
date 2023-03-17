import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IRubro } from 'src/app/models/rubro.model';
import { AppService } from 'src/app/services/app.service';
import { RubroService } from 'src/app/services/rubro.sevice';

@Component({
  selector: 'app-filtro-precios',
  templateUrl: './filtro-precios.component.html',
  styleUrls: ['./filtro-precios.component.css']
})
export class FiltroPreciosComponent implements OnInit, OnDestroy{

  rubros:IRubro[] = [];
  statusSubscription:Subscription;
  @Output() rubrosChanged = new EventEmitter<IRubro[]>();
  
  constructor(private _rubroService:RubroService,
    private _appService:AppService)
  {
    this.statusSubscription = _appService.onSiteStatusChanged().subscribe
    (
      (value)=> {
        this.rubros = this._rubroService.getRubros();
      }
    );
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if(this.statusSubscription)
    {
      this.statusSubscription.unsubscribe();
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
