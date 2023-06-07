import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from '@firebase/auth';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

export const authGuard = () => {
  const router = inject(Router);
  const snackbar = inject(SnackbarComponent);
  const auth = getAuth();

  if (auth.currentUser) {
    return true;
  } else {
    snackbar.openSnackBar('You are not logged in!', 'red-snackbar');
    return router.navigate(['/login']);
  }
};
