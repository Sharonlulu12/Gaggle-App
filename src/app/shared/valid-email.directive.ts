import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const emailRegex = /\S+@\S+\.\S+/;
    const validEmail = emailRegex.test(control.value);
    return validEmail ? null : { validEmail: { value: control.value }};
  };
}
