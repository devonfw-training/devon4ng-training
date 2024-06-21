import { MoviePage } from "cypress/support/po/movies.po";

describe('movie page', () => {
  let moviePage: MoviePage;
  
  beforeEach(() => {
    moviePage = new MoviePage();

    cy.request('POST', '/services/rest/reset');
    cy.visit('/movies');
  });

  it('should update a movie', () => {
    moviePage.movieRow(0).click();

    moviePage.titleInput.clear().type('My end to end movie');
    moviePage.directorsInput.clear().type('Very cool director');

    cy.intercept('POST', '/services/rest/movies').as('saveMovie');
    moviePage.saveButton.click();
    cy.wait('@saveMovie');

    moviePage.movieRow(0).should('contain', 'My end to end movie').should('contain', 'Very cool director')
  });

  it('should create a movie', () => {
    moviePage.movieRow(0).click();
    moviePage.addButton.click();

    moviePage.titleInput.type('My end to end movie');
    moviePage.directorsInput.type('Very cool director');
    moviePage.descriptionInput.type('End to end movie which will blow your mind');
    moviePage.yearInput.type('2024');

    cy.intercept('POST', '/services/rest/movies').as('saveMovie');
    moviePage.saveButton.click();
    cy.wait('@saveMovie');

    moviePage.movieRow(3).should('contain', 'My end to end movie').should('contain', 'Very cool director')
  });
})