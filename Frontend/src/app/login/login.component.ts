import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  auth = inject(AuthService)



  login() {
    this.auth.socialLogin()
  }

}
