import newTodo from '../fixtures/newTodo.json';
import todos from '../fixtures/todos.json';

describe('User flow CRUD todo', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) =>
      req.reply({
        fixture: 'todos.json',
      })
    ).as('fetchTodos');

    cy.visit('/');

    cy.get('[data-testid=TodoList]').children().as('TodoList').last().as('LastTodo');
  });

  it('can create new todo', () => {
    const createTodo = {
      id: '22',
      title: newTodo.title,
      text: newTodo.text,
      __typename: 'Todo',
    };
    const responseData = {
      data: {
        createTodo,
      },
    };

    cy.intercept('POST', '/graphql', (req) => req.reply({ body: responseData, statusCode: 201 })).as('fetchNewTodo');

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
    const updateTodo = {
      id: todos.data.todos[todos.data.todos.length - 1].id,
      title: 'cy: title upd',
      text: 'cy: description updated',
      __typename: 'Todo',
    };
    const responseData = {
      data: {
        updateTodo,
      },
    };

    cy.intercept('POST', '/graphql', (req) => req.reply({ body: responseData, statusCode: 200 })).as('fetchUpdateTodo');

    cy.wait('@fetchTodos').its('response.statusCode').should('eq', 200);

    cy.get('@TodoList').should('have.length', 2);

    cy.get('@LastTodo').find('[data-testid=TodoCard-edit-btn]').click();

    cy.get('[name="title"]').clear().type(updateTodo.title);
    cy.get('[name="text"]').clear().type(updateTodo.text);
    cy.get('[type="submit"]').click();

    cy.wait('@fetchUpdateTodo').its('response.statusCode').should('eq', 200);

    cy.get('@TodoList').should('have.length', 2);
    cy.get('@LastTodo').should('contain', updateTodo.title);
    cy.get('@LastTodo').should('contain', updateTodo.text);
  });

  it('can delete last todo', () => {
    const deleteTodo = todos.data.todos[todos.data.todos.length - 1]; // take last todo from fixtures
    const responseData = {
      data: {
        deleteTodo,
      },
    };

    cy.intercept('POST', '/graphql', (req) => req.reply({ body: responseData, statusCode: 200 })).as('fetchDeleteTodo');

    cy.wait('@fetchTodos').its('response.statusCode').should('eq', 200);

    cy.get('@TodoList').should('have.length', 2);

    cy.get('@LastTodo').find('[data-testid=TodoCard-delete-btn]').click();
    cy.wait('@fetchDeleteTodo').its('response.statusCode').should('eq', 200);

    cy.get('@TodoList').should('have.length', 1);
    cy.get('@LastTodo').should('not.contain', deleteTodo.title);
    cy.get('@LastTodo').should('not.contain', deleteTodo.text);
  });
});
