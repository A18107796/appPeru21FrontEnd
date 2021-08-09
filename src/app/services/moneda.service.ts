import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_spring } from 'src/environments/environment';
import { Moneda } from '../models/moneda';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class MonedaService extends CommonService<Moneda>{
  baseEndPoint = url_spring + 'monedas';

  constructor(httpClient: HttpClient) { 
    super(httpClient);
  }
}
