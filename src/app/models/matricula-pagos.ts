import { Estado } from "../enums/estado";
import { GenericEntityStatus } from "./generic-entity-status";
import { Matricula } from "./matricula";
import { Pension } from "./pension";

export class MatriculaPagos implements GenericEntityStatus{
    nombre!: string;
    id!: number;
    estado!: Estado;
    fecha_pago!: Date;
    fecha_venc!: Date;
    pension!: Pension;
    matricula!: Matricula;
}
