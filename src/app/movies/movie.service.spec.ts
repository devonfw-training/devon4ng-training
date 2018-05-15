import { TestBed, inject } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MovieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });
  });

  it('should be created', inject([MovieService], (service: MovieService) => {
    expect(service).toBeTruthy();
  }));
});
