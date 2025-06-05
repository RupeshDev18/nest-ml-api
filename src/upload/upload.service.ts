import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  saveFileInfo(file: Express.Multer.File) {
    const targetPath = path.join(__dirname, '../../uploads', file.originalname);
    return {
      filename: file.originalname,
      path: targetPath,
      size: file.size,
      uploadedAt: new Date(),
    };
  }
}
