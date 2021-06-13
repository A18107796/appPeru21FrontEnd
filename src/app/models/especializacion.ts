import { Estado } from "../enums/estado";
import { Curso } from "./curso";
import { EspecializacionTipo } from "./especializacion-tipo";

export class Especializacion {
    id!: Number;
    nombre!: String;
    tipo_especializacion!: EspecializacionTipo;
    estado!: Estado;
    cursos: Curso[] = [];

    constructor() {
        this.tipo_especializacion = new EspecializacionTipo();
    }

}
