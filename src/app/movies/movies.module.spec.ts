import { MoviesModule } from './movies.module';

describe('MoviesModule', () => {
  let moviesModule: MoviesModule;

  beforeEach(() => {
    moviesModule = new MoviesModule();
  });

  it('should create an instance', () => {
    expect(moviesModule).toBeTruthy();
  });
});
