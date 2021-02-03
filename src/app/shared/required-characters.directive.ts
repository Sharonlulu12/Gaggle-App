import { AbstractControl, ValidatorFn } from '@angular/forms';

export function requiredCharactersValidator(charRegex: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const containsRequiredCharacter = charRegex.test(control.value);
    return containsRequiredCharacter ? null : { requiredCharacters: { value: control.value }};
  };
}
