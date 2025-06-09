import { Test, TestingModule } from '@nestjs/testing';
import { CsvUploadController } from './csv-upload.controller';

describe('CsvUploadController', () => {
  let controller: CsvUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CsvUploadController],
    }).compile();

    controller = module.get<CsvUploadController>(CsvUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
