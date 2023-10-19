import {DomSanitizer} from '@angular/platform-browser';
import { format } from 'date-fns';

export function getYearSelect(startDate: string, endDate: string){
  let start = new Date(startDate).getFullYear();
  let end = new Date(endDate).getFullYear();
  const anio2015 = new Date('2015-01-1').getFullYear();
  let years: string[] = [];
  if(start >= anio2015){
      for(let year = start; year <= end; year++){
          years.push(year+'');
      }
  }else{
      for(let year = anio2015; year <= end; year++){
          years.push(year+'');
      }
  }
  return years;
}

export function scrollAnimationGoTo(fragmentLinkName: string) {
  window.scroll({
    top: document.getElementById(fragmentLinkName)?.offsetTop! - 80,
    behavior: 'smooth'
  });
}

export function setLegalRepresentativeAttorney(data: object) {
  localStorage.setItem('employee',JSON.stringify(data));
}

export function getDataStore(item: string) {
  return JSON.parse(localStorage.getItem(item)!);
}

export function setDataCacheStore(data: object) {
  localStorage.setItem('cache',JSON.stringify(data));
}

export function setDataGender(data: string) {
  localStorage.setItem('gender',data);
}

export function getDataGender() {
  localStorage.getItem('gender');
}

export function clearCacheData(){
  localStorage.removeItem('cache');
}

export function clearSalaryCalculationData(){
  localStorage.removeItem('employee');
}

export function getCurrentDateTime(){
  return format(new Date(), "dd/MM/yyyy - hh:mm aaaaa'm'");
}

export function setFakeLoggedUser(data: object) {
  localStorage.setItem('token',JSON.stringify(data));
}

export function setNewRecordRqt(data: object) {
  localStorage.setItem('recordRequest', JSON.stringify(data));
}

export function getRecordRqt() {
  return JSON.parse(localStorage.getItem('recordRequest')!);
}

export function deleteRecordRqt(){
  localStorage.removeItem('recordRequest');
}
