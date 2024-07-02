describe('Search and Favorites', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3002'); 
  });

  it('should load the page and display the search input', () => {
    cy.get('input[type="search"]').should('be.visible');
  });

  it('should search for videos and display results', () => {
    const searchTerm = 'rocketseat';

    cy.intercept('GET', '/api/youtube/search?q=*', { fixture: 'youtubeSearch.json' }).as('youtubeSearch');
    cy.get('input[type="search"]').type(`${searchTerm}{enter}`);
  });
});
