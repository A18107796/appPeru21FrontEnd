import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matricula } from '../models/matricula';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  imageToShow: any;
  constructor(private http: HttpClient) { 
    this.getImage()
  }


  getLogo(): Observable<Blob> {
    return this.http.get('assets/dist/img/peru21logo.jpg', { responseType: 'blob' });
  }

  getImage() {
    this.getLogo().subscribe(
      res => {
        console.log("IMG");
        console.log(res);
        this.createImageFromBlob(res);
        
      }, err => {
        console.log(err);
      }
    );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getFichaMatriculaPDF(matricula: Matricula): any {
    if (matricula) {
      return {
        pageSize: 'A3',
        pageOrientation: 'landscape',
        content: [

          {
            columns: [
              [
                {
                  text: 'CORPORACIÓN EDUCATIVA \n PERU 21',
                  fontSize: 25,
                  bold: true,
                  color: '#900C3F',
                  characterSpacing: 5,
                  margin: [0, 40, 0, 0]
                }
              ],
              [
                {
                  image: this.imageToShow,
                  width: 100,
                  alignment: 'right',
                  opacity: 0.5
                }
              ]
            ]
          },
          {
            text: 'FICHA DE MATRICULA',
            fontSize: 20,
            bold: true,
            decoration: 'underline',
            alignment: 'center'

          },
          {
            text: 'Datos del Estudiante',
            style: 'sectionHeader',
            bold: true,
            decoration: 'underline',
            margin: [0, 15, 0, 15]
          },
          {
            columns: [
              [
                {
                  text: matricula.estudiante.nombres + ' ' + matricula.estudiante.apellidos,
                  bold: true
                },
                { text: matricula.estudiante.num_doc, bold: true },
                { text: matricula.estudiante.telefono },
                { text: matricula.estudiante.direccion }
              ],
              [
                {
                  text: [{ text: 'Fecha: ', bold: true }, matricula.fecha_reg],
                  alignment: 'right'
                }
              ]
            ]
          },
          {
            text: 'Datos del Matricula',
            style: 'sectionHeader',
            bold: true,
            decoration: 'underline',
            margin: [0, 15, 0, 15]
          },
          {
            columns: [
              [
                {
                  text: [{ text: 'Especializacion: ', bold: true }, matricula.especializacion.nombre]
                },
                { text: [{ text: 'Sede: ', bold: true }, matricula.sede.nombre] },
                { text: [{ text: 'Turno: ', bold: true }, matricula.turno] }
              ]
            ]
          },
          {
            text: 'Detalle de Matricula',
            style: 'sectionHeader',
            bold: true,
            decoration: 'underline',
            alignment: 'center',
            margin: [0, 15, 0, 15]
          },
          {
            table: {
              headerRows: 1,
              widths: ['auto', '*', 'auto', 'auto'],
              body: [
                [
                  //Columnas
                  { text: 'COD', alignment: 'center', fillColor: '#000000', color: '#FFFFFF' },
                  { text: 'Descripción', alignment: 'center', fillColor: '#000000', color: '#FFFFFF' },
                  { text: 'Fecha de Vencimiento', alignment: 'center', fillColor: '#000000', color: '#FFFFFF' },
                  { text: 'Monto', alignment: 'center', fillColor: '#000000', color: '#FFFFFF' }
                ],
                ...matricula.pagos.map(p => ([{ text: p.pension.id, alignment: 'center' }, p.pension.descripcion, { text: p.fecha_venc, alignment: 'center' }, 'S/. ' + p.pension.monto.toFixed(2)])),
                [
                  { text: 'Total', colSpan: 3, alignment: 'right' },
                  {},
                  {},
                  { text: 'S/. ' + matricula.pagos.reduce((sum, p) => sum + p.pension.monto, 0).toFixed(2), fillColor: '#FBFF01' }]
              ]
            }
          },
          {
            text: 'Detalles Adicionales',
            style: 'sectionHeader',
            margin: [0, 15, 0, 15]
          },
          {
            columns: [
              [{ qr: `${matricula.estudiante.num_doc}`, fit: '50' }],
              [{ text: 'Signature', alignment: 'right', italics: true }],

            ]
          }

        ]
      }
    }
  }
}
