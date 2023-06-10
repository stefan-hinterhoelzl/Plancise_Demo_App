import { Component, NgZone, ViewChild, inject } from '@angular/core';
import {
  Ingredient,
  IngredientQuant,
  Meal,
  MealIngredient,
} from '../models/models';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.scss'],
})
export class CreateMealComponent {
  http = inject(HttpService);
  router = inject(Router);
  _ngZone = inject(NgZone);
  snackbar = inject(SnackbarComponent);

  menuGroup = new FormGroup({
    nameControl: new FormControl(''),
    instructionControl: new FormControl(''),
    ingredients: new FormControl([]),
  });

  ingridients$ = this.http.getIngredients();
  ingridientsQuans: boolean = false;
  ingredients: Ingredient[] = [];
  meal!: Meal;

  quantities: number[] = [];
  units: string[] = [];

  @ViewChild('autosize', { static: false }) autosize!: CdkTextareaAutosize;

  triggerResize() {
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  createMeal() {
    let ingredientQuan: IngredientQuant[] = [];

    this.ingredients.forEach((value, index, arr) => {
      ingredientQuan.push(<IngredientQuant>{
        ingredient: value,
        quantitiy: this.quantities[index],
        unit: this.units[index],
      });
    });

    let mealIngredient = <MealIngredient>{
      meal: this.meal,
      ingridients: ingredientQuan,
    };

    this.http.postMeal(mealIngredient).subscribe({
      next: (res) => {
        this.router.navigate(['/display-meal/'+res.id]);
      },
      error: (err) => {
        console.log(err)
        this.snackbar.openSnackBar(
          'Error adding Meal. Try again later.',
          'red-snackbar'
        );
      },
    });
  }

  continueWithIngridients() {
    this.meal = <Meal>{
      name: this.menuGroup.get('nameControl')!.value,
      instructions: this.menuGroup.get('instructionControl')!.value,
    };

    const ing: Ingredient[] = this.menuGroup.get('ingredients')!.value!;
    this.ingredients.push(...ing);

    this.ingridientsQuans = true;
  }
}
