// mail.service.ts
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your@gmail.com',
      pass: 'your-app-password',
    },
  });

  async sendJobDoneEmail(to: string, file: string) {
    return await this.transporter.sendMail({
      from: '"CSV Processor" <your@gmail.com>',
      to,
      subject: `CSV Processed: ${file}`,
      text: `Your file "${file}" has been successfully processed.`,
    });
  }
}
