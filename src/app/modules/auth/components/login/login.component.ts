import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';
import { roles } from '../../../../models/roles.const';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {

  authForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
    ) {
    this.createForm();
  }

  createForm(): void {
    this.authForm = this.formBuilder.group({
      email: ['juan.ruiz.22.03.00@gmail.com', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      password: ['12345', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
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
            this.router.navigateByUrl('/administrator');
          } else if (userRole === roles.supervisorContractor || userRole === roles.fieldContractor) {
            this.router.navigateByUrl('/contractor');
          } else {
            this.router.navigateByUrl('/auth/logout');
          }

        } else {
          this.showBadCredentialsMessage()
        }
      });
    }
  }

  showBadCredentialsMessage(): void {
    this.messageService.add(
      {
        severity: 'error',
        summary: 'Error',
        detail: 'Credenciales incorrectas'
      }
    );
  }

}
