import { Component, OnInit, inject } from '@angular/core';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Plancise-Demo-App';

  auth = inject(AuthService)


}
