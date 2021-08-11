import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, map, max } from 'rxjs/operators';
import { Matricula } from 'src/app/models/matricula';
import { Moneda } from 'src/app/models/moneda';
import { Pago } from 'src/app/models/pago';
import { PagoDetalle } from 'src/app/models/pago-detalle';
import { TipoComprobante } from 'src/app/models/tipo-comprobante';
import { TipoPago } from 'src/app/models/tipo-pago';
import { AuthService } from 'src/app/services/auth.service';
import { FormsService } from 'src/app/services/forms.service';
import { MonedaService } from 'src/app/services/moneda.service';
import { PagoService } from 'src/app/services/pago.service';
import { ReportsService } from 'src/app/services/reports.service';
import { TipoComprobanteService } from 'src/app/services/tipo-comprobante.service';
import { TipoPagoService } from 'src/app/services/tipo-pago.service';
import Swal from 'sweetalert2';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-register-pago',
  templateUrl: './register-pago.component.html',
  styleUrls: ['./register-pago.component.css']
})
export class RegisterPagoComponent implements OnInit {
  public formSubmited = false;
  public matricula: Matricula = new Matricula();
  public fechaHoy = new Date();
  public monedas: Moneda[] = [];
  public tiposPago: TipoPago[] = [];
  public tipoComprobante: TipoComprobante[] = [];
  public formFactura!: FormGroup;
  public maxID: number = 0;
  public totalPago: number = 0;
  public cargando = false;
  public pago: Pago = new Pago();

  constructor(
    private router: Router,
    private location: Location,
    public pagoService: PagoService,
    private authService: AuthService,
    private monedaS: MonedaService,
    private tipoPS: TipoPagoService,
    private tipoCS: TipoComprobanteService,
    private formBuilder: FormBuilder,
    public formService: FormsService,
    private reportService: ReportsService
  ) { }

  ngOnInit(): void {
    this.getMatricula();
    this.getMonedas();
    this.getTipoComprobante();
    this.getTipoPago();
    this.getMaxID();
    this.createForm();
    this.setDatos();
  }

  setDatos() {
    this.formFactura.get('estudiante.id')?.setValue(this.matricula.estudiante.id);
    this.formFactura.get('estudiante.nombres')?.disable();
    this.formFactura.get('estudiante.dni')?.disable();
    this.formFactura.get('estudiante.nombres')?.setValue(this.matricula.estudiante.nombres + ' ' + this.matricula.estudiante.apellidos);
    this.formFactura.get('estudiante.dni')?.setValue(this.matricula.estudiante.num_doc);

  }

  createForm() {
    this.formFactura = this.formBuilder.group({
      estudiante: this.formBuilder.group({
        id: [null, Validators.required],
        nombres: [null, Validators.required],
        dni: [null, Validators.required]
      }),
      moneda: [null, Validators.required],
      tipoPago: [null, Validators.required],
      tipoComprobante: [null, Validators.required]
    })
  }

  getMatricula() {
    const res = this.pagoService.returnMatricula() as Matricula;
    if (res) {
      this.matricula = res;
      this.matricula.pagos.forEach(p => this.totalPago += p.pension.monto)
    } else {
      this.location.back();
    }

  }



  getMonedas() {
    this.monedaS.listar().subscribe(res => this.monedas = res);
  }

  getTipoPago() {
    this.tipoPS.listar().subscribe(res => this.tiposPago = res);
  }

  getTipoComprobante() {
    this.tipoCS.listar().pipe(
      map(resp => {
        return resp.filter(esp => {
          return esp.nombre !== 'FACTURA'
        })
      })
    ).subscribe(res => this.tipoComprobante = res);
  }

  getMaxID() {
    this.pagoService.getMaxID().subscribe((res: any) => this.maxID = res.max);
  }

  submit() {
    this.formSubmited = true;

    if (this.formFactura.valid) {

      this.mapFactura();
      Swal.fire({
        title: '¿Estas seguro?',
        text: "¿Estas seguro que deseas registrar este pago?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI, registrar.'
      }).then((result) => {
        if (result.isConfirmed) {
          this.cargando = true;
          setTimeout(() => {
            this.pagoService.create(this.pago).subscribe(
              res => {
                const id = res.id;
                this.pagoService.getEntity(res.id).subscribe(
                  pago => {
                    this.cargando = false;
                    const pagoBD = pago.pago;
                    console.log(pagoBD);
                    this.generatePDF(pagoBD);
                    Swal.fire({
                      title: 'Registrado',
                      text: "Pago Registrado Correctamente",
                      icon: 'success',
                      showConfirmButton: true,
                      confirmButtonColor: '#3085d6',
                      confirmButtonText: 'OK'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        this.pagoService.deleteMatriculaStorage();
                        this.location.back();
                      }
                    })
                  },
                  err => {
                    console.log(err);
                  }
                )
              },
              err => {
                console.log(err);
              }
            );
          }, 1000);

        }
      })
    }
  }

  mapFactura() {
    this.pago.estudiante = this.matricula.estudiante;
    this.pago.empleado = this.authService.usuario.empleado;
    this.pago.npago = this.maxID + 1;
    this.pago.tipo_pago = this.formFactura.get('tipoPago')?.value;
    this.pago.tipo_comprobante = this.formFactura.get('tipoComprobante')?.value;
    this.pago.moneda = this.formFactura.get('moneda')?.value;
    this.matricula.pagos.forEach(
      p => {
        let pagoDetalle = new PagoDetalle();
        pagoDetalle.cantidad = 1;
        pagoDetalle.pago = p;
        pagoDetalle.subtotal = p.pension.monto;
        this.pago.pagoDetalles.push(pagoDetalle);
      }
    )
  }

  generatePDF(pago: Pago) {
    console.log("Generando");
    let docDefinition = this.reportService.getFacturaPDF(pago);
    let pdf = pdfMake.createPdf(docDefinition);
    pdf.open();
  }

}
