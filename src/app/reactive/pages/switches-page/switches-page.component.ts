import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termAndConditions: [false, Validators.requiredTrue]
  })

  public person = {
    gender: 'F',
    wantNotifications: false,
  }

  constructor(private fb: FormBuilder) { }

  // metodo que se ejecutara cuando el usuario haga click sobre el boton de guardar
  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);

  }

  // metodo que usaremos para validar que el usuario acepte  los terminos y condiciones
  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }


}
