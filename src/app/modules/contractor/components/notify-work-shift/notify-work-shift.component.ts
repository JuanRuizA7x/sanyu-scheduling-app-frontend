import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CalendarOptions, DatesSetArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import { WorkShiftService } from '../../services/work-shift.service';
import { WorkShift } from 'src/app/models/work-shift.interface';

@Component({
  selector: 'contractor-notify-work-shift',
  templateUrl: './notify-work-shift.component.html',
  styleUrls: ['./notify-work-shift.component.css'],
  providers: [MessageService]
})
export class NotifyWorkShiftComponent {

  currentDate: string;
  startDate: string | undefined;
  endDate: string | undefined;

  workShifts: WorkShift[] = [];
  selectedWorkShift: WorkShift | undefined;

  loading: boolean = false;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    datesSet: this.handleDatesSet.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: []
  };

  constructor(
    private messageService: MessageService,
    private workShiftService: WorkShiftService
  ) {

    const currentYear: string = new Date().getFullYear().toString();
    const currentMonth: string = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const currentDay: string = new Date().getDate().toString().padStart(2, '0');

    this.currentDate = `${currentYear}-${currentMonth}-${currentDay}T00:00:00`;

  }

  getWorkShiftsByDateRange(): void {

    if(this.startDate && this.endDate) {

      this.workShiftService.getWorkShiftsByDateRange(this.startDate, this.endDate)
      .subscribe({
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

  markWorkShiftAsStarted(): void {

    if(this.selectedWorkShift && (this.selectedWorkShift.date == this.currentDate)) {

      this.loading = true;

      this.workShiftService.markWorkShiftAsStarted(this.selectedWorkShift.workShiftId)
      .subscribe({
        next: response => {
          this.getWorkShiftsByDateRange()
          this.selectedWorkShift = undefined;
          this.loading = false;
          this.showMessage('success', 'Se notificó el inicio de turno exitosamente');
        },
        error: error => {
          this.loading = false;
          this.showMessage('error', 'Error al notificar el inicio de turno');
        }
      });

    }

  }

  handleDatesSet(arg: DatesSetArg): void {
    this.startDate = arg.startStr.substring(0,19);
    this.endDate = arg.endStr.substring(0,19);
    this.getWorkShiftsByDateRange();
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
