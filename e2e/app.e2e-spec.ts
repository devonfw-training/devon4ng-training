import { UnitTestExercisesPage } from './app.po';

describe('unit-test-exercises App', () => {
  let page: UnitTestExercisesPage;

  beforeEach(() => {
    page = new UnitTestExercisesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
