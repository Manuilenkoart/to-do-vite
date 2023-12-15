import newTodo from '../fixtures/newTodo.json';
import todos from '../fixtures/todos.json';

describe('User flow CRUD todo', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/todo', { fixture: 'todos.json' }).as('fetchTodos');

    cy.visit('/');

    cy.get('[data-testid=TodoList]').children().as('TodoList').last().as('LastTodo');
  });

  it('can create new todo', () => {
    cy.intercept('POST', '/api/todo', {
      statusCode: 201,
      body: { id: '22', title: newTodo.title, text: newTodo.text },
    }).as('fetchNewTodo');

    cy.wait('@fetchTodos').its('response.statusCode').should('eq', 200);

    cy.get('@TodoList').should('have.length', 2);

    cy.contains('Add todo').click();

    cy.get('[name="title"]').type(newTodo.title);
    cy.get('[name="text"]').type(newTodo.text);
    cy.get('[type="submit"]').click();

    cy.wait('@fetchNewTodo').its('response.statusCode').should('eq', 201);

    cy.get('@TodoList').should('have.length', 3);

    cy.get('@LastTodo').should('contain', newTodo.title);
    cy.get('@LastTodo').should('contain', newTodo.text);
  });

  it('can update last todo', () => {
    const updatedTodo = {
      id: todos[todos.length - 1].id,
      title: 'cy: title upd',
      text: 'cy: description updated',
    };

    cy.intercept('PUT', '/api/todo', {
      statusCode: 200,
      body: { id: updatedTodo.id, title: updatedTodo.title, text: updatedTodo.text },
    }).as('fetchUpdateTodo');

    cy.get('@TodoList').should('have.length.at.least', 2);

    cy.get('@LastTodo').find('[data-testid=TodoCard-edit-btn]').click();

    cy.get('[name="title"]').clear().type(updatedTodo.title);
    cy.get('[name="text"]').clear().type(updatedTodo.text);
    cy.get('[type="submit"]').click();

    cy.wait('@fetchUpdateTodo').its('response.statusCode').should('eq', 200);

    cy.get('@TodoList').should('have.length.at.least', 2);
    cy.get('@LastTodo').should('contain', updatedTodo.title);
    cy.get('@LastTodo').should('contain', updatedTodo.text);
  });

  it('can delete last todo', () => {
    const { id, text, title } = todos[todos.length - 1]; // take last todo from fixtures
    cy.intercept('DELETE', '/api/todo', {
      statusCode: 200,
      body: { id, title, text },
    }).as('fetchDeleteTodo');

    cy.wait('@fetchTodos').its('response.statusCode').should('eq', 200);

    cy.get('@TodoList').should('have.length', 2);

    cy.get('@LastTodo').find('[data-testid=TodoCard-delete-btn]').click();
    cy.wait('@fetchDeleteTodo').its('response.statusCode').should('eq', 200);

    cy.get('@TodoList').should('have.length', 1);
    cy.get('@LastTodo').should('not.contain', title);
    cy.get('@LastTodo').should('not.contain', text);
  });
});
