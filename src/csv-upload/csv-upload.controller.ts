import { Controller, Get } from '@nestjs/common';
import { CsvUploadService } from './csv-upload.service';

@Controller('csv-uploads')
export class CsvUploadController {
  constructor(private readonly csvUploadService: CsvUploadService) {}

  @Get()
  async getAll() {
    return this.csvUploadService.getAllUploads();
  }
}
