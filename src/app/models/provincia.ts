import { Departamento } from "./departamento";

export class Provincia {
    id_provincias!: number;
    nombre_provincia!: string;
    departamento: Departamento;

    public constructor() {
        this.departamento = new Departamento();
    }
}
