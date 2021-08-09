import { GenericEntity } from "./generic-entity";
import { GenericEntityStatus } from "./generic-entity-status";

export class Moneda implements GenericEntity{
    id!: number;
    nombre!: string;
}
