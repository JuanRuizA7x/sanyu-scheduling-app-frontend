import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'administrator-extend-schedule',
  templateUrl: './extend-schedule.component.html',
  styleUrls: ['./extend-schedule.component.css'],
  providers: [MessageService]
})
export class ExtendScheduleComponent {

  contractors: User[] = [];
  selectedContractor: User | undefined;

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {}

  getContractorsByIdentificationNumberLike(event: any): void {

    this.userService.getContractorsByIdentificationNumberLike(event.filter)
    .subscribe({
      next: response => {
        this.contractors = response;
      },
      error: error => {
        this.showMessage('error', 'Error al consultar los contratistas');
      }
    });

  }

  showMessage(severity: string, detail: string): void {
    this.messageService.add(
      {
        severity: severity,
        detail: detail
      }
    );
  }

}
