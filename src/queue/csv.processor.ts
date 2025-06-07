import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('csv') // 'csv' is the queue name
export class CsvProcessor extends WorkerHost {
  async process(job: Job): Promise<any> {
    switch (job.name) {
      case 'process-csv': {
        const { filePath, userId } = job.data;

        console.log(`🚀 Processing CSV for user ${userId}: ${filePath}`);

        // Simulate time-consuming work
        let progress = 0;
        for (let i = 0; i <= 100; i += 10) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          progress = i;
          await job.updateProgress(progress);
        }

        console.log(`✅ Done processing ${filePath}`);
        return { status: 'done', userId };
      }

      default: {
        console.warn(`⚠️ Unknown job type: ${job.name}`);
        return {};
      }
    }
  }
}
