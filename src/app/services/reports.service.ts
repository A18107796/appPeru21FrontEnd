import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante';
import { Matricula } from '../models/matricula';
import { Pago } from '../models/pago';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Estado } from '../enums/estado';
import { Empleado } from '../models/empleado';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  imageToShow: any;
  constructor(private http: HttpClient, private datePipe: DatePipe) {
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

  private transFormDate(date: Date): any {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
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

  openPDF(docDefinition: any) {
    let pdf = pdfMake.createPdf(docDefinition);
    pdf.open();
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

  getColorByStatus(estado: Estado): string {
    if (estado === Estado.MATRICULADO || estado === Estado.ACTIVO) {
      return "#77D7BB";
    } else if (estado === Estado.PENDIENTE) {
      return "#F09007";
    } else {
      return "#E43D2C";
    }
  }

  getCanva(data: any): any {

    return {
      pageSize: 'A4',
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
                margin: [0, 0, 0, 0]
              }
            ],
          ]
        },
        {
          text: 'Reporte de Especializaciones',
          style: 'sectionHeader',
          bold: true,
          decoration: 'underline',
          margin: [0, 30, 0, 15]
        },
        {
          chart: 'pie',
          data: [10, 20, 30, 40],
          colors: ['red', 'green', 'blue', 'black'],
          position: [20, 30],
          size: [80, 100]
        }
      ],
    }
  }

  getFacturaPDF(factura: Pago): any {
    if (factura) {
      return {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        content: [
          {
            columns: [
              [
                {
                  text: 'CORPORACIÓN EDUCATIVA \n PERU 21',
                  fontSize: 25,
                  bold: true,
                  color: '#5806F0',
                  characterSpacing: 5,
                  margin: [0, 0, 0, 0]
                }
              ],
              [
                {
                  margin: [180, 0, 0, 0], //350 - 160
                  table: {
                    widths: ['auto'],
                    body: [
                      [{ text: 'RUC: ' + 20548343900, fontSize: 14, bold: true, alignment: 'center' }],
                      [{ text: 'COMPROBANTE DE PAGO', fontSize: 16, bold: true, alignment: 'center', fillColor: '#000000', color: '#FFFFFF' }],
                      [{ text: 'N° ' + this.getNumRuc(factura.npago), fontSize: 14, bold: true, alignment: 'center' }],

                    ]
                  }
                }
              ]
            ]
          },
          {
            text: 'Datos del Estudiante',
            style: 'sectionHeader',
            bold: true,
            decoration: 'underline',
            margin: [0, 30, 0, 15]
          },
          {
            columns: [
              [
                {
                  text: factura.estudiante.nombres + ' ' + factura.estudiante.apellidos,
                  bold: true
                },
                { text: factura.estudiante.num_doc, bold: true },
                { text: factura.estudiante.telefono },
                { text: factura.estudiante.direccion }
              ],
              [
                {
                  text: [{ text: 'Fecha: ', bold: true }, this.transFormDate(factura.fecha_reg)],
                  alignment: 'right'
                },
                {
                  text: [{ text: 'Moneda: ', bold: true }, factura.moneda.nombre],
                  alignment: 'right'
                }
              ]
            ]
          },
          ,
          {
            text: 'Detalle de Comprobante',
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
                  { text: 'Cantidad', alignment: 'center', fillColor: '#000000', color: '#FFFFFF' },
                  { text: 'Subtotal', alignment: 'center', fillColor: '#000000', color: '#FFFFFF' }
                ],
                ...factura.pagoDetalles.map(p => ([{ text: p.pago.id, alignment: 'center' }, p.pago.pension.descripcion, { text: p.cantidad, alignment: 'center' }, 'S/. ' + p.subtotal.toFixed(2)])),
                [
                  { text: 'Total', colSpan: 3, alignment: 'right' },
                  {},
                  {},
                  { text: 'S/. ' + factura.pagoDetalles.reduce((sum, p) => sum + p.subtotal, 0).toFixed(2), fillColor: '#FBFF01' }]
              ]
            }
          }
        ]
      }
    }
  }

  getStudentsPDF(list: Estudiante[]): any {
    return {
      pageSize: 'A4',
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
          text: 'Lista de Estudiantes'.toUpperCase(),
          style: 'sectionHeader',
          bold: true,
          fontSize: 18,
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
                { text: 'NOMBRE COMPLETO', alignment: 'center', fillColor: '#000000', color: '#FFFFFF' },
                { text: 'NUM DOC', alignment: 'center', fillColor: '#000000', color: '#FFFFFF' },
                { text: 'ESTADO', alignment: 'center', fillColor: '#000000', color: '#FFFFFF' }
              ],
              ...list.map(p => ([{ text: p.id, alignment: 'center' }, p.nombres + " " + p.apellidos, { text: p.num_doc, alignment: 'center' }, { text: p.estado, alignment: 'center', fillColor: this.getColorByStatus(p.estado) }])),
            ]
          },
        }
      ]
    }
  }

  getEmpleadosPDF(list: Empleado[]): any {
    return {
      pageSize: 'A4',
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
          text: 'Lista de Empleados'.toUpperCase(),
          style: 'sectionHeader',
          bold: true,
          fontSize: 18,
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
                { text: 'NOMBRE COMPLETO', alignment: 'center', fillColor: '#000000', color: '#FFFFFF' },
                { text: 'NUM DOC', alignment: 'center', fillColor: '#000000', color: '#FFFFFF' },
                { text: 'ESTADO', alignment: 'center', fillColor: '#000000', color: '#FFFFFF' }
              ],
              ...list.map(p => ([{ text: p.id, alignment: 'center' }, p.nombres + " " + p.apellidos, { text: p.num_doc, alignment: 'center' }, { text: p.estado, alignment: 'center', fillColor: this.getColorByStatus(p.estado) }])),
            ]
          },
        }
      ]
    }
  }

  getNumRuc(number: number): string {
    let retNumber = number.toString();
    let vecesBucle = 7 - retNumber.length;

    if (retNumber.length > 7) {
      return "9999999";
    }

    for (let index = 0; index < vecesBucle; index++) {
      retNumber = "0" + retNumber;
    }

    return retNumber;
  }
}
