import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const rtx5090 = {
  name: 'RTX 5090',
  price: 3000,
  inStorage: 246,

}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  // public myForm: FormGroup = new FormGroup({
  //    name: new FormControl('', [], []),
  //    price: new FormControl(0),
  //    inStorage: new FormControl(0),
  // })

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(1)]],
    inStorage: [0, [Validators.required, Validators.min(1)]],

  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm.reset(rtx5090)
  }

  // metodo que usaremos para validar los campos
  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors &&
      this.myForm.controls[field].touched
  }

  getFieldError(field: string): string | null {

    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracters.`;
      }
    }

    return null;
  }

  // metodo que usaremos para guardar los elementos del formulario
  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    };

    console.log(this.myForm.value)

    // restablecemos el valor del formulario a sus valores por defecto
    this.myForm.reset({ price: 0, inStorage: 0 })
  }
}
