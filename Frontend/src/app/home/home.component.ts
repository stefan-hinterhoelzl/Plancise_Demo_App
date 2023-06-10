import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { Ingredient, Meal } from '../models/models';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateIngredientDialogComponent } from '../dialogs/create-ingredient-dialog/create-ingredient-dialog.component';
import { ignoreElements } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  snackbar = inject(SnackbarComponent);
  auth = inject(AuthService);
  http = inject(HttpService);
  dialog = inject(MatDialog);

  constructor() {
    this.meals = [];
    this.ingredients = [];
  }
  ngOnInit(): void {
    this.getMeals();
    this.getIngredients();
  }



  meals!: Meal[];
  ingredients!: Ingredient[];

  getMeals() {
    this.http.getMeals().subscribe((value) => {
      this.meals.length = 0;
      this.meals.push(...value);
    });
  }

  getIngredients() {
    this.http.getIngredients().subscribe((value) => {
      this.ingredients.length = 0;
      this.ingredients.push(...value);
      this.ingredients.sort((a, b) => a.id.localeCompare(b.id));
    });
  }

  createIngredient(ingredient: Ingredient) {
    this.http.postIngredient(ingredient).subscribe({
      next: (res: Ingredient) => {
        this.snackbar.openSnackBar(`${res.name} added.`, 'green-snackbar');
        this.ingredients.push(res);
        this.ingredients.sort((a, b) => a.id.localeCompare(b.id));
      },
      error: (err) => {
        this.snackbar.openSnackBar(
          'Error adding Ingredient. Try again later.',
          'red-snackbar'
        );
      },
    });
  }

  updateIngredient(ingredient: Ingredient) {
    this.http.putIngredient(ingredient).subscribe({
      next: (res: Ingredient) => {
        this.snackbar.openSnackBar(`Changed to ${res.name}.`, 'green-snackbar');
        this.ingredients.splice(
          this.ingredients.findIndex((value) => value.id === res.id),
          1
        );
        this.ingredients.push(res);
        this.ingredients.sort((a, b) => a.id.localeCompare(b.id));
      },
      error: (err) => {
        this.snackbar.openSnackBar(
          'Error changing Ingredient. Try again later.',
          'red-snackbar'
        );
      },
    });
  }

  openNewIngredientDialog(ing?: Ingredient) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '500px';

    if (ing) {
      dialogConfig.data = {
        ingridientName: ing.name,
        ingridientId: ing.id,
      };
    }

    const dialogRef = this.dialog.open(
      CreateIngredientDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((ingredient) => {
      console.log(ingredient);
      if (ingredient !== undefined && !ingredient.updateMode) {
        this.createIngredient(ingredient.ingredient);
      } else if (ingredient !== undefined && ingredient.updateMode) {
        this.updateIngredient(ingredient.ingredient);
      }
    });
  }

  deleteIngredient(ing: Ingredient) {
    this.http.deleteIngredient(ing.id).subscribe({
      next: () => {
        this.snackbar.openSnackBar(`Ingredient deleted.`, 'green-snackbar');
        this.ingredients.splice(
          this.ingredients.findIndex((value) => value.id === ing.id),
          1
        );
      },
      error: (err) => {
        this.snackbar.openSnackBar(
          'Error deleting Ingredient. Try again later.',
          'red-snackbar'
        );
      },
    });
  }
}
