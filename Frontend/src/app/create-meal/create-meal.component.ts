import { Component, inject } from '@angular/core';
import { Meal } from '../models/models';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.scss']
})
export class CreateMealComponent {

  http = inject(HttpService)
  router = inject(Router)

  menuGroup = new FormGroup({
    nameControl: new FormControl(''),
    instructionControl: new FormControl(''),
    ingredients: new FormControl([]),
  });

  createMeal() {
    const meal: Meal = <Meal>{
      name: this.menuGroup.get('nameControl')!.value,
      instructions: this.menuGroup.get('instructionControl')!.value,
    };

    this.http.postMeal(meal).subscribe((res) => {

    });
  }

}
