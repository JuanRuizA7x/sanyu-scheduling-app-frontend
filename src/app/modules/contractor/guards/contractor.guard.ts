import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { roles } from '../../../models/roles.const';

export const contractorGuard: CanActivateChildFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const roleKey: string = 'userRole';

  if (!authService.isAuthenticated()) {
    return router.parseUrl('/auth/login');
  }

  const userRole = sessionStorage.getItem(roleKey);

  if (userRole === roles.supervisorContractor || userRole === roles.fieldContractor) {
    return true;
  } else if (userRole === roles.administrator) {
    return router.parseUrl('/administrator');
  } else {
    return router.parseUrl('/auth/logout');
  }

};
