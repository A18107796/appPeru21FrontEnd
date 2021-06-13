import { Empleado } from "./empleado";

export class Usuario {
    id_usuario!: number;
    email!: string;
    password!: string;
    enabled!: boolean;
    empleado!: Empleado;
    roles!: string[];

    constructor() {
        this.empleado = new Empleado();
        this.roles = [];
    }
}
