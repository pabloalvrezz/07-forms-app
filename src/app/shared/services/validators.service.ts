import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  // constantes que usaremos para validar el email
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  // constante que utilizaremos para que el userName no sea strider
  public cantBeStrider = (control: FormControl): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase()

    if (value === 'strider') {
      return {
        noStrider: true,
      }
    }

    return null;
  }

  public isValidField(myForm: FormGroup, field: string) {
    return myForm.controls[field].errors &&
      myForm.controls[field].touched
  }
}
