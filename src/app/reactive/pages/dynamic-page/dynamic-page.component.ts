import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    add: ['', [Validators.minLength(2)]],
    favorites: this.fb.array([
      ['Call of Duty', Validators.required],
      ['Valorant', Validators.required],
    ])
  })

  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) { }

  get favoriteGames() {
    return this.myForm.get('favorites') as FormArray;
  }

  onSubmit(): void {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched()
      return;
    }

    console.log(this.myForm.value)
    this.myForm.reset()
  }

  // metodo que usaremos para validar los campos
  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors &&
      this.myForm.controls[field].touched
  }

  // metodo que usaremos para obtener el error del campo
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

  // metodo que usaremos para comprobar si hay algun error en un campo de un FormArray
  isValidFieldInArray(formArray: FormArray, i: number) {
    return formArray.controls[i].errors &&
      formArray.controls[i].touched
  }

  // metodo que usaremos para eliminar elementos de un FormArray
  deleteElementsFromArray(formArray: FormArray, i: number) {
    formArray.removeAt(i)
  }

  // metodo que usaremos para añadir elementos a un FormArray
  addElementstoFromArray() {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    // this.favoriteGames.push(  new FormControl( newGame, Validators.required ) );
    this.favoriteGames.push(
      this.fb.control(newGame, Validators.required)
    );

    this.newFavorite.reset();

  }
}

