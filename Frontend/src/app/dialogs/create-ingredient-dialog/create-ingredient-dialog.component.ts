import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Ingredient } from 'src/app/models/models';

@Component({
  selector: 'app-create-ingredient-dialog',
  templateUrl: './create-ingredient-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  styleUrls: ['./create-ingredient-dialog.component.scss'],
})
export class CreateIngredientDialogComponent implements OnInit {
  dialogRef = inject(MatDialogRef<CreateIngredientDialogComponent>);

  ingredientForm = new FormGroup({
    nameControl: new FormControl('', Validators.required),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data !== null) {
      this.updateMode = true;
      this.ingridientName = data.ingridientName;
      this.id = data.ingridientId
    }
    else {
      this.updateMode = false;
      this.ingridientName = ""
      this.id = -1
    }
  }
  ngOnInit(): void {
    if (this.updateMode)
      this.ingredientForm.get('nameControl')?.setValue(this.ingridientName);
  }

  ingridientName: string;
  updateMode: boolean;
  id: number;

  save() {
    let ingridient: Ingredient = <Ingredient> {
      name: this.ingredientForm.get('nameControl')!.value,
    }

    if (this.updateMode) ingridient.id = this.id

    let result = {
      updateMode: this.updateMode,
      ingredient: ingridient
    }

    this.dialogRef.close(result);
  }

  close() {
    this.dialogRef.close();
  }
}
