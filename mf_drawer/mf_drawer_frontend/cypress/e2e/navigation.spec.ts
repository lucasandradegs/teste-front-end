/// <reference types="cypress" />

describe('header navigation', () => {
  beforeEach(() => {
    cy.visit('/', { failOnStatusCode: false } );
    cy.intercept('GET', '/api/favorites/count', {}).as('getFavoritesCount');

  });

  it('should be able to open and close sideMenu', () => {
    cy.viewport('iphone-6');
    cy.get('.toggleMenu').click();
    cy.get('.sideMenuContent').should('be.visible');
    cy.get('.closeMenu').click();
    cy.get('.sideMenuContent').should('not.be.visible');
  });

  it('it should be able to navigate to videos section on sideMenu', () => {
    cy.viewport('iphone-6');
    cy.get('.toggleMenu').click();
    cy.get('#linkToVideosMobile').click();
  });

  it('it should be able to navigate to favorites section on sideMenu', () => {
    cy.viewport('iphone-6');
    cy.get('.toggleMenu').click();
    cy.get('#linkToFavoritesMobile').click();
  });
});