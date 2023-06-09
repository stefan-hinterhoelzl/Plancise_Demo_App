import { Injectable, inject } from '@angular/core';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { Router } from '@angular/router';
import {
  GoogleAuthProvider,
  User,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    this.reactToLogin();
  }

  router = inject(Router);
  snackbar = inject(SnackbarComponent);

  async socialLogin() {
    const auth = getAuth();

    let provider = new GoogleAuthProvider();

    await signInWithRedirect(auth, provider);
  }

  async reactToLogin() {
    const auth = getAuth();
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      this.snackbar.openSnackBar('Logged in!', 'green-snackbar');
      this.router.navigate(['home']);
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

  get currentUser() {
    const auth = getAuth();
    return auth.currentUser;
  }
}


export const authGuard = () => {
  const router = inject(Router);
  const snackbar = inject(SnackbarComponent);
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        resolve(true);
      } else {
        router.navigate(["/login"]);
        snackbar.openSnackBar("You are not logged in!", "red-snackbar")
        resolve(false);
      }
    });
  });
};
