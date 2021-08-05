import { Estado } from "../enums/estado";

export class Periodo {
    id!: number;
    nombre!: string;
    fecha_inicio!: Date;
    fecha_fin!: Date;
    anio!: Date;
    estado!: Estado;
}
