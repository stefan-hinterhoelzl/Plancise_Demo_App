import { Component, OnInit, inject } from '@angular/core';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Plancise-Demo-App';

  snackbar = inject(SnackbarComponent)

  ngOnInit() {
    
    
  }

}
