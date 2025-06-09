// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';

import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';

import { csvQueue } from './queue/csv.queue';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup Bull Board dashboard
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');

  createBullBoard({
    queues: [new BullAdapter(csvQueue)],
    serverAdapter,
  });

  const expressApp = express();
  expressApp.use('/admin/queues', serverAdapter.getRouter());

  app.use('/admin/queues', serverAdapter.getRouter());

  await app.listen(3000);
}
bootstrap();
