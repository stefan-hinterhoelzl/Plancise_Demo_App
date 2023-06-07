import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule, MatSnackBar],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  snackBar = inject(MatSnackBar);

  timeOut = 5000;

  constructor() { }

  openSnackBar(message: string, className: string = "", action: string = "") {
    return this.snackBar.open(message, action, {
      duration: this.timeOut,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: className,
    });
  }
}