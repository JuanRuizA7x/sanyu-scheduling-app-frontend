import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../../services/holiday.service';
import { ScheduleService } from '../../services/schedule.service';
import { Schedule } from 'src/app/models/schedule.interface';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'administrator-assign-work-shift',
  templateUrl: './assign-work-shift.component.html',
  styleUrls: ['./assign-work-shift.component.css']
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
    private scheduleService: ScheduleService
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

}
