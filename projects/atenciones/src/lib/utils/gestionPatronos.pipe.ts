import { Pipe, PipeTransform } from '@angular/core';
/*
 * Transform boolean to "Activa" or "Inactiva"
*/
@Pipe({name: 'ActiveStatusPipe'})
export class ActiveStatusPipe implements PipeTransform {
  transform(status: any): string {
    let state = status == "true" ? "Activa" : "Inactiva";
    return state;
  }
}
0
@Pipe({name: 'PersonTypePipe'})
export class PersonTypePipe implements PipeTransform {
  transform(value: string): string {
    const str2 = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    return str2.replace("_"," ");
  }
}

