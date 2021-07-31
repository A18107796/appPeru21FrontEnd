import { GenericEntityStatus } from "./generic-entity-status";
import { Persona } from "./persona";
import { Sede } from "./sede";

export class Estudiante extends Persona implements GenericEntityStatus {

    sede: Sede = new Sede();
}
