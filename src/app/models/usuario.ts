import { Empleado } from "./empleado";
import { GenericEntity } from "./generic-entity";

export class Usuario implements GenericEntity{
    id_usuario!: number;
    email!: string;
    password!: string;
    enabled!: boolean;
    empleado: Empleado = new Empleado();
    roles!: string[];

    constructor() {
        this.roles = [];
    }
    id!: number;
    nombre!: string;
}
