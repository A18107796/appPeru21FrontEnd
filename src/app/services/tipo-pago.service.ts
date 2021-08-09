import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_spring } from 'src/environments/environment';
import { TipoPago } from '../models/tipo-pago';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService extends CommonService<TipoPago>{
  baseEndPoint = url_spring + 'tipos-pago';

  constructor(httpClient: HttpClient) { 
    super(httpClient);
  }
}
