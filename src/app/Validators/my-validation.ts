import { AbstractControl } from "@angular/forms";
import { map } from "rxjs/operators"
import { EmpleadoService } from "../services/empleado.service";

export class MyValidation {

    constructor(public empleadoService: EmpleadoService) {

    }




    static existsEmail(_empleadoService: EmpleadoService) {
        return (control: AbstractControl) => {
            const value = control.value;
            return _empleadoService.verifyEmail(value).pipe(
                map(res => {
                    return !res.existe ? null : { existe: true };
                })
            );
        }
    }
}