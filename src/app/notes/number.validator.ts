import { AbstractControl, ValidatorFn } from '@angular/forms';

//todo: what's missing here, it is not working
export class NumberValidators {

  static number(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      console.log('number validators')
      if (c.value && (isNaN(c.value))) {
        console.log(c.value)
        return { number: true };
      }
      return null;
    };
  }
}
