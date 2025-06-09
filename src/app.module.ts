import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UploadModule } from './upload/upload.module';
import { QueueModule } from './queue/queue.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CsvUploadService } from './csv-upload/csv-upload.service';
import { CsvUploadController } from './csv-upload/csv-upload.controller';
import { CsvQueueService } from './queue/csv.queue.service';
import { CsvJobController } from './csv-upload/csv-upload.csv-job.controller';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],
      synchronize: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/csv-project'),
    AuthModule,
    UsersModule,
    UploadModule,
    QueueModule,
    CsvJobController
  ],
  controllers: [AppController, CsvUploadController],
  providers: [AppService, CsvUploadService, MailService],
  exports:[QueueModule,CsvQueueService,MailService]
})
export class AppModule {}
