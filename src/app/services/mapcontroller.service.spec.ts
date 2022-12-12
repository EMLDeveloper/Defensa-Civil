import { TestBed } from '@angular/core/testing';

import { MapControllerService } from './mapcontroller.service';

describe('MapcontrollerService', () => {
  let service: MapControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
