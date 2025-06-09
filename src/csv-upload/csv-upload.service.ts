import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CsvUpload } from './csv-upload.schema';
import { Model } from 'mongoose';

@Injectable()
export class CsvUploadService {
  constructor(
    @InjectModel(CsvUpload.name) private model: Model<CsvUpload>,
  ) {}

  async saveUpload(data: Partial<CsvUpload>) {
    return await this.model.create(data);
  }

  async getAllUploads() {
    return this.model.find().sort({ uploadedAt: -1 }).exec();
  }
}
