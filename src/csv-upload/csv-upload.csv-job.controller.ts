// src/csv-upload/csv-job.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { csvQueue } from '../queue/csv.queue';

@Controller('jobs')
export class CsvJobController {
  @Get('status/:id')
  async getJobStatus(@Param('id') id: string) {
    const job = await csvQueue.getJob(id);
    if (!job) return { error: 'Job not found' };

    const state = await job.getState();

    return {
      id: job.id,
      status: state,
      progress: job.progress,
      result: job.returnvalue,
      attemptsMade: job.attemptsMade,
      failedReason: job.failedReason,
    };
  }
}
