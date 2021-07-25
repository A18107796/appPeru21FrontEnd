import { Estado } from "../enums/estado";
import { Distrito } from "./distrito";
import { GenericEntity } from "./generic-entity";
import { GenericEntityStatus } from "./generic-entity-status";
import { TipoDocumento } from "./tipo-documento";

export class Persona implements GenericEntity, GenericEntityStatus{
    id!: number;
    nombre!: string;
    nombres!: string;
    apellidos!: string;
    num_doc!: string;
    estado_civil!: CharacterData;
    genero!: string;
    fecha_nac!: Date;
    email!: string;
    direccion!: string;
    telefono!: string;
    estado!: Estado;
    tipo_documento: TipoDocumento = new TipoDocumento();
    distrito: Distrito = new Distrito();

}
