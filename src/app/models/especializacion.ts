import { Estado } from "../enums/estado";
import { EspecializacionTipo } from "./especializacion-tipo";

export class Especializacion {
    id!: Number;
    nombre!: String;
    tipo_especializacion!: EspecializacionTipo;
    estado!: Estado;

    constructor() {
        this.tipo_especializacion = new EspecializacionTipo();
    }

}
