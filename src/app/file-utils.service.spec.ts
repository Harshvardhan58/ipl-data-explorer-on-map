import { TestBed, inject } from '@angular/core/testing';

import { FileUtilsService } from './file-utils.service';

describe('FileUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileUtilsService]
    });
  });

  it('should be created', inject([FileUtilsService], (service: FileUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
