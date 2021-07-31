import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_spring } from 'src/environments/environment';
import { Sede } from '../models/sede';
import { CommonServiceStatusService } from './common-service-status.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class SedeService extends CommonServiceStatusService<Sede>{

  baseEndPoint = url_spring + 'sedes'
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
