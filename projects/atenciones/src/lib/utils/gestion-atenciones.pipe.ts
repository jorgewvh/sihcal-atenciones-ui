import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({name: 'DateFromDatetime'})
export class DateFromDatetime implements PipeTransform {
  transform(data: any): string {
    let arrayDate:any = data.split(",")
    let newDate:any = new Date(arrayDate[0], arrayDate[1]-1, arrayDate[2],  arrayDate[3],  arrayDate[4],  arrayDate[5])
    let testDate = format(newDate, 'MM/dd/yyyy HH:mm a')
    return testDate;
  }
}

@Pipe({name: 'TimeFromDatetime'})
export class TimeFromDatetime implements PipeTransform {
  transform(data: any): string {
    let arrayDate:any = data.split(",");
    let newDate:any = new Date(arrayDate[0], arrayDate[1]-1, arrayDate[2],  arrayDate[3],  arrayDate[4],  arrayDate[5])
    let time = format(newDate, 'HH:mm a')
    return time;
  }

}
