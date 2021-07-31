import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_spring } from 'src/environments/environment';
import { Periodo } from '../models/periodo';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService extends CommonService<Periodo>{
  baseEndPoint = url_spring + 'periodos'

  constructor(httpClient: HttpClient) {
    super(httpClient)
   }
}
