import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { roles } from '../../../../models/roles.const';


@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];
  showLogout: Boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.authService.role.subscribe((newRole) => {

      if (newRole === roles.administrator) {
        this.getAdministratorItems();
        this.showLogout = true;
      } else if (newRole === roles.supervisorContractor || newRole === roles.fieldContractor) {
        this.getContractorItems();
        this.showLogout = true;
      } else {
        this.items = [];
        this.showLogout = false;
      }

    });
  }

  getAdministratorItems(): void {
    this.items = [
      { label: 'Asignar turno', icon: PrimeIcons.CALENDAR, routerLink: '/administrator/assign-work-shift' },
      { label: 'Ampliar turno', icon: PrimeIcons.CLOCK, routerLink: '/administrator/extend-schedule' },
      { label: 'Cargar archivo', icon: PrimeIcons.UPLOAD, routerLink: '/administrator/upload-file' },
      { label: 'Generar informe', icon: PrimeIcons.FILE, routerLink: '/administrator/generate-report' }
    ];
  }

  getContractorItems(): void {
    this.items = [
      { label: 'Turnos', icon: PrimeIcons.CALENDAR, routerLink: '/contractor/notify-work-shift' }
    ];
  }

  logout(): void {
    this.router.navigateByUrl('/auth/logout');
  }

}
