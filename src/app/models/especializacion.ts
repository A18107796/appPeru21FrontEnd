import { Estado } from "../enums/estado";
import { Curso } from "./curso";
import { EspecializacionTipo } from "./especializacion-tipo";
import { GenericEntity } from "./generic-entity";
import { GenericEntityStatus } from "./generic-entity-status";

export class Especializacion implements GenericEntity, GenericEntityStatus{
    id!: number;
    nombre!: string;
    tipo_especializacion!: EspecializacionTipo;
    estado!: Estado;
    cursos: Curso[] = [];

    constructor() {
        this.tipo_especializacion = new EspecializacionTipo();
    }


}
