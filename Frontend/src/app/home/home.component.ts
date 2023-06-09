import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { Ingredient, Meal } from '../models/models';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  snackbar = inject(SnackbarComponent)
  auth = inject(AuthService)
  http = inject(HttpService)

  constructor() {
    this.meals = []
    this.ingredients = []
  }
  ngOnInit(): void {
    this.getMeals()
  }


  menuGroup = new FormGroup({
    nameControl: new FormControl(""),
    instructionControl: new FormControl(""),
    ingredients: new FormControl([])

  });

  meals!: Meal[];
  ingredients!: Ingredient[];


  getMeals() {
    this.http.getMeals().subscribe(value => {
      this.meals.length = 0
      this.meals.push(...value)
    })
  }


  createMeal() {
    const meal: Meal = <Meal> {
      name: this.menuGroup.get('nameControl')!.value,
      instructions: this.menuGroup.get('instructionControl')!.value,
    }

    this.http.postMeal(meal).subscribe(res => {
      this.meals.push(res)

      this.menuGroup.get('nameControl')!.setValue("")
      this.menuGroup.get('instructionControl')!.setValue("")
    })

  }

}
