import { Component, Input, OnInit } from '@angular/core';
import { IPrecioItem } from 'src/app/models/precioItem.model';

@Component({
  selector: 'app-precio-item-row',
  templateUrl: './precio-item-row.component.html',
  styleUrls: ['./precio-item-row.component.css']
})
export class PrecioItemRowComponent implements OnInit{

  @Input() precioItem?:IPrecioItem;

  constructor()
  {
    
  }
  ngOnInit(): void {

  }
}
