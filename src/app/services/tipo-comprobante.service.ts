import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_spring } from 'src/environments/environment';
import { TipoComprobante } from '../models/tipo-comprobante';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class TipoComprobanteService extends CommonService<TipoComprobante>{
  baseEndPoint = url_spring + 'tipos-comprobante';

  constructor(httpClient: HttpClient) { 
    super(httpClient);
  }
}
