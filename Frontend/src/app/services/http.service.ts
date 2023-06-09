import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { Ingredient, Meal } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  BASE_URL = 'http://localhost:3000/';

  private http = inject(HttpClient)
  private snackbar = inject(SnackbarComponent)



  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.BASE_URL + 'meals');
  }

  postMeal(newMeal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.BASE_URL + 'meals', newMeal)
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.BASE_URL + 'ingredients');
  }

  postIngredient(newIngredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.BASE_URL + 'ingredients', newIngredient);
  }

  putIngredient(changeIngredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(this.BASE_URL + 'ingredients', changeIngredient);
  }

  deleteIngredient(id: number): Observable<any> {
    return this.http.delete<any>(this.BASE_URL + 'ingredients/'+id)
  }

}
