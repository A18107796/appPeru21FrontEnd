import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Periodo } from 'src/app/models/periodo';
import { FormsService } from 'src/app/services/forms.service';
import { ModalService } from 'src/app/services/modal.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { MyValidation } from 'src/app/Validators/my-validation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-create-periodo',
  templateUrl: './modal-create-periodo.component.html',
  styleUrls: ['./modal-create-periodo.component.css']
})
export class ModalCreatePeriodoComponent implements OnInit {
  public formSubmited = false;
  public periodo: Periodo = new Periodo();
  formPeriodo!: FormGroup
  constructor(public modalService: ModalService, public _fb: FormBuilder, private datePipe: DatePipe, public _fs: FormsService,
    private _pService: PeriodoService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.createForm();
    this.formSubmited = false;
  }



  createForm() {
    let res = this.datePipe.transform(new Date(), 'YYYY-MM-dd');
    this.formPeriodo = this._fb.group({
      nombre: [null, [Validators.required]],
      fecha_inicio: [null, [Validators.required, MyValidation.dateMinimun(res?.toString())]],
      fecha_fin: [null, [Validators.required, MyValidation.dateMinimun(res?.toString())]]
    })
  }

  submit() {
    this.formSubmited = true;
    if (this.formPeriodo.valid) {
      this.periodo = this.formPeriodo.value;
      this._pService.create(this.periodo).subscribe(
        res => {
          this.cerrarModal();
          Swal.fire({
            title: 'Correcto',
            text: "Periodo Academico creado correctamente",
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              
              window.location.reload();
            }
          })
        },
        err => {
          Swal.fire('Error', err.error.message, 'error');

        }

      )
    }

  }

}
