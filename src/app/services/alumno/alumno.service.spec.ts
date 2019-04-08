import { TestBed, inject } from '@angular/core/testing';

import { AlumnoService } from './alumno.service';

describe('AlumnoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlumnoService]
    });
  });

  it('should be created', inject([AlumnoService], (service: AlumnoService) => {
    expect(service).toBeTruthy();
  }));
});
