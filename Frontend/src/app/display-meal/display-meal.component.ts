import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, filter, map, share, switchMap } from 'rxjs';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-display-meal',
  templateUrl: './display-meal.component.html',
  styleUrls: ['./display-meal.component.scss'],
})
export class DisplayMealComponent {
  route = inject(ActivatedRoute);
  http = inject(HttpService);

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
}
