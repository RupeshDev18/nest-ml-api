import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CsvUpload extends Document {
  @Prop()
  userId: string;

  @Prop()
  filename: string;

  @Prop()
  rowCount: number;

  @Prop({ type: Object })
  sampleData: Record<string, any>[];

  @Prop({ default: Date.now })
  uploadedAt: Date;
}

export const CsvUploadSchema = SchemaFactory.createForClass(CsvUpload);
