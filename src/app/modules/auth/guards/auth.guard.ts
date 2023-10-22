import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { roles } from '../../../models/roles.const';

export const authGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const roleKey: string = 'userRole';

  if (authService.isAuthenticated()) {

    const userRole = sessionStorage.getItem(roleKey);

    if (userRole === roles.administrator) {
      return router.parseUrl('/administrator');
    } else if (userRole === roles.supervisorContractor || userRole === roles.fieldContractor) {
      return router.parseUrl('/contractor');
    } else {
      return router.parseUrl('/auth/logout');
    }

  }

  return true;

};
