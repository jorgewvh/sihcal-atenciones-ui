import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import PersonType from '../../models/enums/PersonType.enum';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  userTypeOf: PersonType = PersonType.JURIDICA;
  userTypeOf$ = new EventEmitter<PersonType>();
  search$ = new EventEmitter<string>();

  currentStepEvent$ = new EventEmitter<any>();
  disablPersonType$ = new EventEmitter<boolean>();
  isShowLoader$ = new EventEmitter<any>();
  exportType$ = new EventEmitter<string>();
  constructor() {}
}
