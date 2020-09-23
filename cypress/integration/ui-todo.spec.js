const DEV_URL = "http://localhost:3000";

describe("CRUD flow - ui-todo", () => {
  before(() => {
    cy.visit(DEV_URL).wait(1000);
    cy.get("[data-cy=todo-task__button-delete]").click({multiple: true});
  });

  it("should display header", () => {
    cy.get("[data-cy=header]").should("have.text", "TODO");
  });

  it("should be able to add todo", () => {
    cy.get("[data-cy=todo-input__input]").type("Buy Groceries");
    cy.get("[data-cy=todo-input__button").click();
    cy.get("[data-cy=todo-input__input]").type("Write TODO app");
    cy.get("[data-cy=todo-input__button").click();
    cy.get("[data-cy=todo-input__input]").type("Send masks to grandma");
    cy.get("[data-cy=todo-input__button").click();
    cy.get("[data-cy=todo-task__name]").should(
      "have.text",
      "Buy GroceriesWrite TODO appSend masks to grandma"
    );
  });

  it("should be able to delete todo", () => {
    cy.get("[data-cy=todo-task__button-delete]").first().click();
    cy.get("[data-cy=todo-task__name]").should(
      "have.text",
      "Write TODO appSend masks to grandma"
    );
    cy.get("[data-cy=todo-task__button-delete]").first().click();
    cy.get("[data-cy=todo-task__name]").should(
      "have.text",
      "Send masks to grandma"
    );
    cy.get("[data-cy=todo-task__button-delete]").first().click();
    cy.get("[data-cy=todo-task__name]").should('not.exist');
  });

  it("should not be able to delete todo while updating", () => {
    cy.get("[data-cy=todo-input__input]").type("Buy Groceries");
    cy.get("[data-cy=todo-input__button]").click();
    cy.get("[data-cy=todo-task__button-update]").click();
    cy.get("[data-cy=todo-task__button-delete]").should('be.disabled');
    cy.get("[data-cy=todo-task__button-update]").click();
    cy.get("[data-cy=todo-task__name]").should(
      "have.text",
      "Buy Groceries"
    );
  });
});
