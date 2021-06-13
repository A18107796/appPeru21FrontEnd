import { Estado } from "../enums/estado";
import { Distrito } from "./distrito";
import { TipoDocumento } from "./tipo-documento";

export class Persona {
    id!: number;
    nombres!: string;
    apellidos!: string;
    num_doc!: string;
    estado_civil!: string;
    genero!: string;
    fecha_nac!: Date;
    email!: string;
    direccion!: string;
    estado!: Estado;
    tipo_documento!: TipoDocumento;
    distrito!: Distrito;



}
