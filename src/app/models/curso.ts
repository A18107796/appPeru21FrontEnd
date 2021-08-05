import { Estado } from "../enums/estado";
import { GenericEntity } from "./generic-entity";
import { GenericEntityStatus } from "./generic-entity-status";

export class Curso implements GenericEntity, GenericEntityStatus {
    id!: number;
    nombre!: string;
    estado!: Estado;
}
