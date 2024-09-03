import { TestBed } from '@angular/core/testing';

import { MapFormSynchroService } from './map-form-synchro.service';

describe('MapFormSynchroService', () => {
  let service: MapFormSynchroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapFormSynchroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
