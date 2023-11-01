import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HolidayService } from '../../services/holiday.service';
import { ReportService } from '../../services/report.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'administrator-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css'],
  providers: [MessageService]
})
export class GenerateReportComponent implements OnInit {

  weekends: number[];
  holidays: Date[] = [];
  loading: boolean = false;

  selectedDate: Date | undefined;

  constructor(
    private holidayService: HolidayService,
    private reportService: ReportService,
    private messageService: MessageService
  ) {
    this.weekends = [0, 6];
  }

  ngOnInit(): void {
    this.getHolidays();
  }

  getHolidays(): void {

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 5;
    const countryCode = 'CO';

    this.holidayService.getHolidaysByYearRangeAndCountryCode(startYear, endYear, countryCode)
      .subscribe((holidays: Date[]) => this.holidays = holidays);

  }

  generateReport(): void {

    if(this.selectedDate) {

      this.loading = true;

      this.reportService.generateReport(this.selectedDate)
      .pipe(
        catchError((error) => {
          this.showMessage('error', 'Error', 'No se pudo generar el reporte')
          return [];
        })
      ).subscribe(
        response => {
          this.loading = false;
          this.selectedDate = undefined;
          this.showMessage('success', 'Reporte generado', 'Revisa tu email');
        }
      );

    }

  }

  showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add(
      {
        severity: severity,
        summary: summary,
        detail: detail
      }
    );
  }

}
