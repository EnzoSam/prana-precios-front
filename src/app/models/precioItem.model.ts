import { IItem } from "./item.model";
import { IListaPrecio } from "./listaPrecio.model";

export interface IPrecioItem {
    id: any | undefined,
    precio: number,
    Item:IItem,
    ListaPrecio?:IListaPrecio
}