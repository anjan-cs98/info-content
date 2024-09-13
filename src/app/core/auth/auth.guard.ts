import { CanActivateFn, Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  console.log('canActivete');
  const router = new Router();
  //Check if Remember Me was checked and load previous login details
  const isViewData = localStorage.getItem('isView');
  if (isViewData) {
    return true;
  } else {
    // Redirect the user to the login page if not authenticated
    router.navigate(['/login']);
    alert('Plaease login ...!');
    return false;
  }
};
