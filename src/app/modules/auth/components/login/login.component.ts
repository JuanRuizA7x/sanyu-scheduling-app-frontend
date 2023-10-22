import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { roles } from '../../../../models/roles.const';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  authForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.createForm();
  }

  createForm(): void {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
    });
  }

  login(): void {
    const email = this.authForm.get('email')?.value;
    const password = this.authForm.get('password')?.value;

    if (email && password) {
      this.authService.login(email, password).subscribe((success) => {
        if (success) {

          const userRole = this.authService.getUserRole();

          if (userRole === roles.administrator) {
            console.log('Bienvenido Administrador');
          } else if (userRole === roles.contractor) {
            console.log('Bienvenido Contratista');
          } else {
            console.log("Rol indefinido");
          }

        } else {
          console.log('Error en el inicio de sesión');
        }
      });
    }
  }

}
