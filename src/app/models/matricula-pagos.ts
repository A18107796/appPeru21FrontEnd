import { Estado } from "../enums/estado";
import { Matricula } from "./matricula";
import { Pension } from "./pension";

export class MatriculaPagos {
    id!: number;
    estado!: Estado;
    fecha_pago!: Date;
    fecha_venc!: Date;
    pension!: Pension;
    matricula!: Matricula;
}
