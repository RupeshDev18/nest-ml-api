// src/queues/csv.queue.ts
import { Queue } from 'bullmq';
import { connection } from './bullmq.config';

export const csvQueue = new Queue('csv', { connection });
