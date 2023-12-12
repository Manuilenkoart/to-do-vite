describe('User flow CRUD todo', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('can create new todo', () => {
    cy.contains('Add todo').click();

    cy.get('[name="title"]').click().type('cy: my title');
    cy.get('[name="text"]').click().type('cy: my description');

    cy.get('[type="submit"]').click();
  });

  it('can update last todo', () => {
    cy.get('[data-testid=TodoList]').children().should('have.length.at.least', 1);

    const lastTodoCard = cy.get('[data-testid=TodoList]').children().last();
    lastTodoCard.find('[data-testid=TodoCard-edit-btn]').click();

    const inputTitle = cy.get('[name="title"]');
    const inputText = cy.get('[name="text"]');

    inputTitle.click().clear();
    inputText.click().clear();

    inputTitle.click().type('cy: title upd');
    inputText.click().type('cy: description updated');

    cy.get('[type="submit"]').click();

    cy.get('[data-testid=TodoList]').children().last().should('contain.text', 'cy: title upd');
    cy.get('[data-testid=TodoList]').children().last().should('contain.text', 'cy: description updated');
  });

  it('can delete last todo', () => {
    cy.get('[data-testid=TodoList]').children().should('have.length.at.least', 1);

    const lastTodoCard = cy.get('[data-testid=TodoList]').children().last();
    lastTodoCard.find('[data-testid=TodoCard-delete-btn]').click();
  });
});
