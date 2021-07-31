import { Pipe, PipeTransform } from '@angular/core';
import { Estudiante } from '../models/estudiante';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(estudiantes: Estudiante[], search: string = ''): Estudiante[] {
    if (search.length === 0)
      return estudiantes;

    const studentsFiltered = estudiantes.filter(
      est => {
        const stuendetNameComplete: string = est.nombres.trim().concat(" ".concat(est.apellidos)).toLowerCase();
        return stuendetNameComplete.includes(search.toLowerCase());
      }
    );
    return studentsFiltered;
  }

}
