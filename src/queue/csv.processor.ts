import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import * as fs from 'fs';
import * as FormData from 'form-data';
import axios from 'axios';
import { Inject } from '@nestjs/common';
import { CsvUploadService } from 'src/csv-upload/csv-upload.service';

@Processor('csv')
export class CsvProcessor extends WorkerHost {
    constructor(
    @Inject(CsvUploadService)
    private readonly csvUploadService: CsvUploadService,
  ) {
    super();
  }
  async process(job: Job): Promise<any> {
    if (job.name !== 'process-csv') return;

    const { filePath, userId } = job.data;

    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    try {
      const response = await axios.post('http://localhost:8000/process-csv/', form, {
        headers: form.getHeaders(),
      });

      console.log(`✅ Python response:`, response.data);
      await this.csvUploadService.saveUpload({
        userId,
        filename: response.data.filename,
        rowCount: response.data.row_count,
        sampleData: response.data.sample_data,
        });
      
      return response.data;
    } catch (error) {
      console.error(`❌ Error calling Python service:`, error.message);
      return { error: error.message };
    }
  }
}
