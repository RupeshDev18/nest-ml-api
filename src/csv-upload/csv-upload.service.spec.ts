import { Test, TestingModule } from '@nestjs/testing';
import { CsvUploadService } from './csv-upload.service';

describe('CsvUploadService', () => {
  let service: CsvUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvUploadService],
    }).compile();

    service = module.get<CsvUploadService>(CsvUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
