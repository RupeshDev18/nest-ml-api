import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { CsvProcessor } from './csv.processor';
import { env } from 'node:process';
import { CsvQueueService } from './csv.queue.service';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: env.REDIS_HOST || 'localhost',
        port:  6379,
      },
    }),
    BullModule.registerQueue({
      name: 'csv',
    }),
  ],
  providers: [CsvQueueService, CsvProcessor],
  exports: [CsvQueueService],
})
export class QueueModule {}
