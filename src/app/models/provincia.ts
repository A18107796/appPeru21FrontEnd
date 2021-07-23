import { Departamento } from "./departamento";

export class Provincia {
    id!: number;
    nombre!: string;
    departamento: Departamento;

    public constructor() {
        this.departamento = new Departamento();
    }
}
