import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../../services/holiday.service';
import { ScheduleService } from '../../services/schedule.service';
import { WorkShiftService } from '../../services/work-shift.service';
import { MessageService } from 'primeng/api';
import { Schedule } from 'src/app/models/schedule.interface';
import { User } from 'src/app/models/user.interface';
import { WorkShiftResponse } from 'src/app/models/work-shift-response.interface';
import { roles } from 'src/app/models/roles.const';
import { schedules } from 'src/app/models/schedules.const';

@Component({
  selector: 'administrator-assign-work-shift',
  templateUrl: './assign-work-shift.component.html',
  styleUrls: ['./assign-work-shift.component.css'],
  providers: [MessageService]
})
export class AssignWorkShiftComponent implements OnInit {

  tomorrowDate: Date;
  weekends: number[];
  holidays: Date[] = [];

  schedules: Schedule[] = [];
  availableContractors: User[] = [];

  selectedDateRange: Date[] | undefined;
  selectedSchedule: Schedule | undefined;
  selectedContractor: User | undefined;

  constructor(
    private holidayService: HolidayService,
    private scheduleService: ScheduleService,
    private workShiftService: WorkShiftService,
    private messageService: MessageService
  ) {
    this.tomorrowDate = new Date();
    this.tomorrowDate.setDate(this.tomorrowDate.getDate() + 1);
    this.weekends = [0, 6];
  }

  ngOnInit(): void {
    this.getHolidays();
    this.getSchedules();
  }

  getHolidays(): void {

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 5;
    const countryCode = 'CO';

    this.holidayService.getHolidaysByYearRangeAndCountryCode(startYear, endYear, countryCode)
      .subscribe((holidays: Date[]) => this.holidays = holidays);

  }

  getSchedules(): void {
    this.scheduleService.getSchedules()
      .subscribe((schedules: Schedule[]) => this.schedules = schedules);
  }

  getAvailableContractors(): void {

    this.selectedContractor = undefined;

    if(!this.selectedDateRange?.[0] || !this.selectedDateRange?.[1]) {
      this.availableContractors = [];
    }

    if(this.selectedDateRange?.[1] && this.selectedSchedule) {

      let roleName: string = '';

      switch(this.selectedSchedule.name) {
        case schedules.office:
          roleName = roles.supervisorContractor;
          break;
        case schedules.morning:
        case schedules.afternoon:
          roleName = roles.fieldContractor;
          break;
        default:
          break;
      }

      this.workShiftService.getAvailableContractorsByRoleDateRange(
        roleName, this.selectedDateRange[0], this.selectedDateRange[1]
      ).subscribe(
        (availableContractors: User[]) => this.availableContractors = availableContractors
      );

    }

  }

  assignWorkShifts(): void {

    if(
      this.selectedDateRange?.[0] &&
      this.selectedDateRange?.[1] &&
      this.selectedSchedule?.scheduleId &&
      this.selectedContractor?.userId
    ) {
      this.workShiftService.assignWorkShifts(
        this.selectedDateRange[0],
        this.selectedDateRange[1],
        this.selectedSchedule?.scheduleId,
        this.selectedContractor?.userId
      ).subscribe(
        (assignedWorkShiftsCount: WorkShiftResponse) => {
          this.showAssignedWorkShiftsCount(assignedWorkShiftsCount.affectedRows);
          this.cleanSelectedObjects();
        }
      );
    }

  }

  showAssignedWorkShiftsCount(assignedWorkShiftsCount: number): void {
    this.messageService.add(
      {
        severity: 'success',
        detail: `Turnos asignados: ${assignedWorkShiftsCount}`
      }
    );
  }

  cleanSelectedObjects(): void {
    this.selectedDateRange =  undefined;
    this.selectedSchedule =  undefined;
    this.availableContractors = [];
    this.selectedContractor = undefined;
  }

}
