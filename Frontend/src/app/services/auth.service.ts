import { Injectable, inject } from '@angular/core';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { Router } from '@angular/router';
import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  router = inject(Router);
  snackbar = inject(SnackbarComponent);

  async socialLogin() {
    const auth = getAuth();

    let provider = new GoogleAuthProvider();

    await signInWithRedirect(auth, provider);

    const result = await getRedirectResult(auth);
    console.log(result)
    if (result) {
      console.log(result)
      const user = result.user;
      this.snackbar.openSnackBar('Logged in!', 'green-snackbar');
      this.router.navigate([' ']);
    } else {
      this.snackbar.openSnackBar('Login failed!', 'red-snackbar');
    }
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.snackbar.openSnackBar('Logged out!', 'green-snackbar');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.snackbar.openSnackBar(
          'Logout failed, try again later!',
          'red-snackbar'
        );
      });
  }
}
