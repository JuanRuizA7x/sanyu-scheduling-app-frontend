import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from "ngx-spinner";
import { UploadFileService } from '../../services/upload-file.service';
import { FileUpload } from 'primeng/fileupload';
import { CsvFileError } from 'src/app/models/csv-file-error.interface';

interface UploadEvent {
  files: File[];
}

@Component({
  selector: 'administrator-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
  providers: [MessageService]
})
export class UploadFileComponent {

  uploadedFile: File | undefined = undefined;

  constructor(
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private uploadFileService: UploadFileService
  ) {}

  uploadFile(event: UploadEvent, fileUploadController: FileUpload): void {

    this.spinner.show();
    console.log(this.uploadedFile);

    for(let file of event.files) {
      this.uploadFileService.generateReport(file)
      .subscribe({
        next: response => {

          let details: string = '';

          if(response.insertsCount > 0) {
            details = `Turnos creados: ${response.insertsCount}`;
            this.showMessage('success', details);
          }

          if(response.updatesCount > 0) {
            details = `Turnos actualizados: ${response.updatesCount}`;
            this.showMessage('info', details);
          }

          if(response.errors.length > 0) {
            details = `Errores: ${response.errors.length}`;
            this.generateErrorReport(response.errors);
            this.showMessage('error', details);
          }

          fileUploadController.clear();
          this.spinner.hide();

        },
        error: error => {
          this.showMessage('error', 'Error al procesar el archivo');
          fileUploadController.clear();
          this.spinner.hide();
        }
      });
    }

  }

  generateExampleTemplate(): void {

    const csvTitle = 'Plantilla de ejemplo.csv';
    const csvContent = 'TIPO DE IDENTIFICACIÓN, NÚMERO DE IDENTIFICACIÓN, HORARIO, FECHA DE INICIO, FECHA DE FINALIZACIÓN\n' +
    'CC, 1234567890, Oficina, 2000-01-01, 2000-01-31';

    this.generateCSV(csvTitle, csvContent);

  }

  generateErrorReport(errors: CsvFileError[]): void {

    const csvTitle = 'Reporte de errores.csv';
    let csvContent = 'LÍNEA, DETALLE DEL ERROR\n';

    errors.forEach(error => {
      csvContent += `${error.row},${error.message}\n`;
    });

    this.generateCSV(csvTitle, csvContent);

  }

  generateCSV(csvTitle: string, csvContent: string): void {

    const blob = new Blob([csvContent], { type: 'text/csv' });

    const csvUrl = window.URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = csvUrl;

    a.download = csvTitle;

    a.click();

    window.URL.revokeObjectURL(csvUrl);

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
