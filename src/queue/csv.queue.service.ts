import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class CsvQueueService {
  constructor(
    @InjectQueue('csv') private readonly csvQueue: Queue,
  ) {}

  async queueCsvProcessingJob(filePath: string, userId: string) {
    await this.csvQueue.add('process-csv', {
      filePath,
      userId,
    });
  }
}
