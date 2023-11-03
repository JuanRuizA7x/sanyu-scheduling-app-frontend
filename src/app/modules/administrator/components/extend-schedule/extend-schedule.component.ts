import { Component } from '@angular/core';
import { MessageService, Message } from 'primeng/api';
import { CalendarOptions, DatesSetArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import { ScheduleExtensionService } from '../../services/schedule-extension.service';
import { UserService } from '../../services/user.service';
import { WorkShiftService } from '../../services/work-shift.service';
import { User } from 'src/app/models/user.interface';
import { WorkShift } from 'src/app/models/work-shift.interface';
import { ScheduleExtensionRequest } from 'src/app/models/schedule-extension-request.interface';

@Component({
  selector: 'administrator-extend-schedule',
  templateUrl: './extend-schedule.component.html',
  styleUrls: ['./extend-schedule.component.css'],
  providers: [MessageService]
})
export class ExtendScheduleComponent {

  contractors: User[] = [];
  selectedContractor: User | undefined;

  startDate: string | undefined;
  endDate: string | undefined;

  workShifts: WorkShift[] = [];
  selectedWorkShift: WorkShift | undefined;

  startTime: string | undefined;
  endTime: string | undefined;
  reason: string | undefined;

  loading: boolean = false;

  scheduleExtensionAlreadyExists: Message[] = [
    {
      severity: 'warn',
      detail: 'El turno de trabajo seleccionado ya cuenta con una ampliación de horario'
    }
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    datesSet: this.handleDatesSet.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: []
  };

  constructor(
    private messageService: MessageService,
    private scheduleExtensionService: ScheduleExtensionService,
    private userService: UserService,
    private workShiftService: WorkShiftService
  ) {
    this.showMessage('success', 'La ampliación de horario se realizó exitosamente');
  }

  getContractorsByIdentificationNumberLike(value: string): void {

    if(value.length == 0) {

      this.contractors = [];
      this.workShifts = [];
      this.calendarOptions.events = [];
      this.selectedContractor = undefined;
      this.selectedWorkShift = undefined;
      this.startTime = undefined;
      this.endTime = undefined;
      this.reason = undefined;

    } else {

      this.userService.getContractorsByIdentificationNumberLike(value)
      .subscribe({
        next: response => {
          this.contractors = response;
        },
        error: error => {
          this.showMessage('error', 'Error al consultar los contratistas');
        }
      });

    }

  }

  getWorkShiftsByUserIdAndDateRange(): void {

    if(
      this.selectedContractor &&
      this.startDate &&
      this.endDate
    ) {

      this.workShiftService.getWorkShiftsByUserIdAndDateRange(
        this.selectedContractor.userId,
        this.startDate,
        this.endDate
      ).subscribe({
        next: response => {

          this.workShifts = response;
          let events: any[] = [];

          this.workShifts.forEach(workShift => {
            events.push({
              title: workShift.schedule.name,
              date: workShift.date.substring(0, 10),
              workShiftId: workShift.workShiftId
            })
          });

          this.calendarOptions.events = events;

        },
        error: error => {
          this.showMessage('error', 'Error al consultar los turnos asignados');
        }
      });

    }

  }

  extendSchedule(): void {

    if(
      this.selectedWorkShift &&
      this.startTime &&
      this.endTime &&
      this.reason
    ) {

      const scheduleExtensionRequest: ScheduleExtensionRequest = {
        startTime: this.startTime,
        endTime: this.endTime,
        reason: this.reason,
        workShiftId: this.selectedWorkShift.workShiftId
      }

      this.loading = true;

      this.scheduleExtensionService.extendSchedule(scheduleExtensionRequest)
      .subscribe({
        next: response => {

          console.log('Entró al response');
          this.getWorkShiftsByUserIdAndDateRange();

          this.selectedWorkShift = undefined;
          this.startTime = undefined;
          this.endTime = undefined;
          this.reason = undefined;

          this.loading = false;

          this.showMessage('success', 'La ampliación de horario se realizó exitosamente');

        },
        error: error => {

          console.log('Entró al error');
          this.loading = false;

          this.showMessage('error', 'Error al realizar la ampliación de horario');

        }
      });

    }

  }

  handleDatesSet(arg: DatesSetArg): void {
    this.startDate = arg.startStr.substring(0,19);
    this.endDate = arg.endStr.substring(0,19);
    this.getWorkShiftsByUserIdAndDateRange();
  }

  handleEventClick(arg: any) {

    this.workShifts.forEach(workShift => {

      if(workShift.workShiftId == arg.event._def.extendedProps.workShiftId) {
        this.selectedWorkShift = workShift;
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
