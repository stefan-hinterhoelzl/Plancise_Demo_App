import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp } from "firebase/app"
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatMenuModule } from '@angular/material/menu'
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MatListModule } from '@angular/material/list'
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateMealComponent } from './create-meal/create-meal.component';
import { DisplayMealComponent } from './display-meal/display-meal.component';



//initialize Firebase
const app = initializeApp(environment.firebase)


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreateMealComponent,
    DisplayMealComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatListModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [SnackbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
