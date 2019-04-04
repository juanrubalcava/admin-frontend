import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationService } from '../../services/validation.service';
import { Validator, AbstractControl, Validators, NG_VALIDATORS } from '@angular/forms';

/**
 * This validator works like "required" but it does not allow whitespace either
 *
 * @export
 * @class NoWhitespacesDirective
 * @implements {Validator}
 */
@Directive({
  selector: '[appNoWhiteSpaces]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NoWhitespacesDirective, multi: true }]
})
export class NoWhitespacesDirective implements Validator {

  private valFn = ValidationService.NoWhitespaceValidator();
  validate(control: AbstractControl): { [key: string]: any } {
    return this.valFn(control);
  }
}
