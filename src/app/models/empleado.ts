import { Estado } from "../enums/estado";
import { Cargo } from "./cargo";
import { Persona } from "./persona";
import { Usuario } from "./usuario";

export class Empleado extends Persona  {
    
    cargo: Cargo =  new Cargo();
    constructor(){
        super();
    }
}
