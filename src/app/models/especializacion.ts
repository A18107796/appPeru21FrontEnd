import { Estado } from "../enums/estado";
import { Curso } from "./curso";
import { EspecializacionTipo } from "./especializacion-tipo";
import { GenericEntity } from "./generic-entity";

export class Especializacion implements GenericEntity{
    id!: number;
    nombre!: string;
    tipo_especializacion!: EspecializacionTipo;
    estado!: Estado;
    cursos: Curso[] = [];

    constructor() {
        this.tipo_especializacion = new EspecializacionTipo();
    }


}
