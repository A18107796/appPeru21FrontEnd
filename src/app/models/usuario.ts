import { Empleado } from "./empleado";

export class Usuario {
    id_usuario!: number;
    email!: string;
    password!: string;
    enabled!: boolean;
    empleado: Empleado = new Empleado();
    roles!: string[];

    constructor() {
        this.roles = [];
    }
}
