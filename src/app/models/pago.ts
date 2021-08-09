import { Estado } from "../enums/estado";
import { Empleado } from "./empleado";
import { Estudiante } from "./estudiante";
import { GenericEntityStatus } from "./generic-entity-status";
import { Moneda } from "./moneda";
import { PagoDetalle } from "./pago-detalle";
import { TipoComprobante } from "./tipo-comprobante";
import { TipoPago } from "./tipo-pago";

export class Pago implements GenericEntityStatus {
    id!: number;
    npago!: number;
    ruc!: string;
    tipo_comprobante: TipoComprobante = new TipoComprobante();
    tipo_pago: TipoPago = new TipoPago();
    empleado: Empleado = new Empleado();
    estudiante: Estudiante = new Estudiante();
    moneda: Moneda = new Moneda();
    fecha_reg!: Date;
    nombre!: string;
    estado!: Estado;
    pagoDetalles: PagoDetalle[] = [];
}
