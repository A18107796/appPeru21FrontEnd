import { MatriculaPagoService } from "../services/matricula-pago.service";
import { GenericEntity } from "./generic-entity";
import { MatriculaPagos } from "./matricula-pagos";

export class PagoDetalle implements GenericEntity{
    id!: number;
    cantidad!: number;
    subtotal!: number;
    pago: MatriculaPagos = new MatriculaPagos();
    
    nombre!: string;
}
