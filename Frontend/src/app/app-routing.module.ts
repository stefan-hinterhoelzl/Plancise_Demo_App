import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './services/auth.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateMealComponent } from './create-meal/create-meal.component';
import { DisplayMealComponent } from './display-meal/display-meal.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create-meal',
    component: CreateMealComponent,
    canActivate: [authGuard]
  },

  {
    path: 'display-meal/:mealId',
    component: DisplayMealComponent,
    canActivate: [authGuard]
  },

  {path: '**',
   redirectTo: 'home',
   pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
