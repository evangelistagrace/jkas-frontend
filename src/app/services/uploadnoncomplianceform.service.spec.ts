import { TestBed } from '@angular/core/testing';

import { UploadnoncomplianceformService } from './uploadnoncomplianceform.service';

describe('UploadnoncomplianceformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadnoncomplianceformService = TestBed.get(UploadnoncomplianceformService);
    expect(service).toBeTruthy();
  });
});
