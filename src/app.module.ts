import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UploadModule } from './upload/upload.module';
import { QueueModule } from './queue/queue.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    UploadModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports:[QueueModule]
})
export class AppModule {}
