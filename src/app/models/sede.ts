import { Estado } from "../enums/estado";
import { SedeService } from "../services/sede.service";
import { Distrito } from "./distrito";
import { GenericEntityStatus } from "./generic-entity-status";

export class Sede implements GenericEntityStatus{
    id!: number;
    nombre!: string;
    telefono!: string;
    foto!: string;
    direccion!: string;
    distrito: Distrito = new Distrito();
    estado!: Estado;
}
