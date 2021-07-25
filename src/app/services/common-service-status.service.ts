import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../enums/estado';
import { GenericEntityStatus } from '../models/generic-entity-status';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceStatusService<T extends GenericEntityStatus> extends CommonService<T>{

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }


  changeStatus(entity: T, estado: Estado): Observable<any>{
    return this.httpClient.put(this.baseEndPoint + "/estado/" + entity.id + "?estado=" + estado, null);
  }

  

}
