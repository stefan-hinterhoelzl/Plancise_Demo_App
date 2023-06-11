import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, map, share, switchMap } from 'rxjs';
import { HttpService } from '../services/http.service';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

@Component({
  selector: 'app-display-meal',
  templateUrl: './display-meal.component.html',
  styleUrls: ['./display-meal.component.scss'],
})
export class DisplayMealComponent {
  route = inject(ActivatedRoute);
  http = inject(HttpService);
  snackbar = inject(SnackbarComponent);
  router = inject(Router);

  meal$ = this.route.params.pipe(
    map((params) => params['mealId']),
    switchMap((mealId) => this.http.getMealById(mealId))
  );

  ingredients$ = this.route.params.pipe(
    map((params) => params['mealId']),
    switchMap((mealId) => this.http.getIngredientsForMeal(mealId)),
    share()
  );

  view$ = combineLatest([this.meal$, this.ingredients$]);

  deleteMeal(id: string) {
    this.http.deleteMeal(id).subscribe({
      next: () => {
        this.snackbar.openSnackBar("Meal deleted", "green-snackbar")
        this.router.navigate(['home'])
      },
      error: () => {
        this.snackbar.openSnackBar("Deleting failed. Try again.", "red-snackbar")
      }
    })
  }
}
