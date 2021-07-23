import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url_spring } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  url = url_spring + "ubicaciones";
  constructor(private htppClient: HttpClient) { }


  getDepartamentos(): Observable<any> {
    return this.htppClient.get(this.url + '/departamentos');
  }

  getProvinciasByIDDep(idDep: number): Observable<any> {
    return this.htppClient.get(this.url + '/provincias/' + idDep);
  }

  getDistritosByIdProv(idProvincia: number): Observable<any> {
    return this.htppClient.get(this.url + '/distritos/' + idProvincia);
  }

  getTipo_Documentos(): Observable<any> {
    return this.htppClient.get(this.url + '/tipos-documento');
  }




}
