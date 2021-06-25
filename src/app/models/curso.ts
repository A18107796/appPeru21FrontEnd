import { Estado } from "../enums/estado";
import { GenericEntity } from "./generic-entity";

export class Curso implements GenericEntity {
    id!: number;
    nombre!: string;
    estado!: Estado;
}
