import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { Ingredient, IngredientQuantRaw, Meal, MealIngredient } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  BASE_URL = 'http://localhost:3000/';

  private http = inject(HttpClient)
  private snackbar = inject(SnackbarComponent)



  getMeals(searchterm: string): Observable<Meal[]> {
    return this.http.get<Meal[]>(searchterm !== "" ? this.BASE_URL + 'meals?q='+searchterm : this.BASE_URL + 'meals');
  }

  getMealById(id: string): Observable<Meal> {
    return this.http.get<Meal>(this.BASE_URL+ 'meals/'+id);
  }

  postMeal(newMeal: MealIngredient): Observable<any> {
    return this.http.post<any>(this.BASE_URL + 'meals', newMeal, {responseType: 'json', observe: 'body'})
  }

  deleteMeal(id: string): Observable<any> {
    return this.http.delete<any>(this.BASE_URL + 'meals/'+id)
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.BASE_URL + 'ingredients');
  }

  getIngredientsForMeal(id: string): Observable<IngredientQuantRaw[]> {
    return this.http.get<IngredientQuantRaw[]>(this.BASE_URL + 'ingredients/'+id);
  }

  postIngredient(newIngredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.BASE_URL + 'ingredients', newIngredient);
  }

  putIngredient(changeIngredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(this.BASE_URL + 'ingredients', changeIngredient);
  }

  deleteIngredient(id: string): Observable<any> {
    return this.http.delete<any>(this.BASE_URL + 'ingredients/'+id);
  }

}
