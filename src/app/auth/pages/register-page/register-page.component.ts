import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    userName: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
    private validatorsService: ValidatorsService,
  ) { }

  // metodo que usaremos para validar los campos
  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  // metodo que se ejecutara a la hora de darle al boton de guardar
  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}

