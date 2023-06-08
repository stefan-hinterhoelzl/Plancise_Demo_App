import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  snackbar = inject(SnackbarComponent)
  auth = inject(AuthService)
}
