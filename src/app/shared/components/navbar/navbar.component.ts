import { Component } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  items: MenuItem[] = [];
  showLogout: Boolean = false;

  fillMenuItems(): void {
    this.items = [
      { label: 'Asignar turno', icon: PrimeIcons.CALENDAR },
      { label: 'Ampliar turno', icon: PrimeIcons.CLOCK },
      { label: 'Cargar archivo', icon: PrimeIcons.UPLOAD },
      { label: 'Generar informe', icon: PrimeIcons.FILE }
    ];
  }

}
