import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenCharactersValidator(charRegex: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = charRegex.test(control.value);
    return forbidden ? { forbiddenCharacter: { value: control.value }} : null;
  };
}
