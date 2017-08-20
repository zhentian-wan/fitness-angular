import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
@Directive({
  selector: `[formControl][no-special-chars], 
             [formControlName][no-special-chars], 
             [ngModel][no-special-chars]`,
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NoSpecialCharsValidator)
    }
  ]
})

export class NoSpecialCharsValidator implements Validator {
  validate(c: AbstractControl): { [key: string]: any; } {
    const res = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(c.value);
    return res ? {special: true}: null;
  }
}
