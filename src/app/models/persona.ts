import { Estado } from "../enums/estado";
import { Distrito } from "./distrito";
import { GenericEntity } from "./generic-entity";
import { TipoDocumento } from "./tipo-documento";

export class Persona implements GenericEntity{
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
