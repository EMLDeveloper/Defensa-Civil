import { TestBed } from '@angular/core/testing';

import { MapcontrollerService } from './mapcontroller.service';

describe('MapcontrollerService', () => {
  let service: MapcontrollerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapcontrollerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
