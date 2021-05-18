import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhonePipe implements PipeTransform {

  transform(rawPhone:string): string {
    rawPhone = rawPhone.charAt(0) !== '0' ? '0' + rawPhone : rawPhone;
    rawPhone = rawPhone.trim().replace(/^\+|-|\(|\)/g, '');

    let newPhone:string = "";
    newPhone = newPhone  + rawPhone.substr(0,1);
    newPhone = newPhone + "(" + rawPhone.substr(1,3) + ") ";
    newPhone = newPhone + rawPhone.substr(4,3) + " ";
    newPhone = newPhone + rawPhone.substr(6,2) + " ";
    newPhone = newPhone + rawPhone.substr(8,2);
    return newPhone;
  }

}
