import { Estado } from "../enums/estado";
import { Empleado } from "./empleado";
import { Especializacion } from "./especializacion";
import { Estudiante } from "./estudiante";
import { MatriculaPagos } from "./matricula-pagos";
import { Periodo } from "./periodo";
import { Sede } from "./sede";

export class Matricula {
    id!: number;
    num_cuotas!: number;
    detalles!: string;
    fecha_reg!: string;
    turno!: string;
    estado!: Estado;
    empleado: Empleado = new Empleado();
    estudiante: Estudiante = new Estudiante();
    especializacion: Especializacion = new Especializacion();
    periodo: Periodo = new Periodo();
    sede: Sede = new Sede();
    pagos: MatriculaPagos[] = [];
}
