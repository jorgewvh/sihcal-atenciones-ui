import { AbstractControl } from "@angular/forms";
import { isEqual } from 'date-fns';
export class CustomValidators {
    static validPassword(control: AbstractControl){
        const value = control.value;
        if (!containsNumber(value)){
            return {invalid_password: true};
        }
        return null;
    }

    static isEqualDate({value}: AbstractControl, endDate: any){
        return isEqual(value, endDate) ? {invalid_date: false} : {invalid_date: true}
    }
}

function containsNumber(value: string){
    return value.split('').find(v=> isNumber(v)) !== undefined;
}

function isNumber(value: string){
    return !isNaN(parseInt(value, 10));
}