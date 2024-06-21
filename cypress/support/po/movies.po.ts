export class MoviePage {
    movieRow(index: number): Cypress.Chainable<JQuery> {
        return cy.get(`[data-cy="movie-row-${index}"]`);
    }

    get addButton(): Cypress.Chainable<JQuery> {
        return cy.get(`[data-cy="add-movie-button"]`);
    }

    get titleInput(): Cypress.Chainable<JQuery> {
        return cy.get('[data-cy="movie-title-input"]')
    }

    get directorsInput(): Cypress.Chainable<JQuery> {
        return cy.get('[data-cy="movie-directors-input"]')
    }

    get descriptionInput(): Cypress.Chainable<JQuery> {
        return cy.get('[data-cy="movie-description-input"]')
    }

    get yearInput(): Cypress.Chainable<JQuery> {
        return cy.get('[data-cy="movie-year-input"]')
    }

    get saveButton(): Cypress.Chainable<JQuery> {
        return cy.get(`[data-cy="save-movie-button"]`);
    }
}