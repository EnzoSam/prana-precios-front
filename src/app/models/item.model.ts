import { IRubro } from "./rubro.model"

export interface IItem {
    id: any | undefined,
    nombre: string,
    codigo: string,
    Rubro:IRubro,
    descripcion:string
}