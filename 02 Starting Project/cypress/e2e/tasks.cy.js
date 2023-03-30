/// <reference types="cypress" />

describe("Task Management", () => {
  it("should open and close the new task modal", () => {
    cy.visit("http://localhost:5173");
    const newTaskButton = cy.get("button", { name: "New Task" });

    // Close using backdrop
    newTaskButton.click();
    cy.get("dialog").should("be.visible");
    cy.get(".backdrop").click({ force: true });
    cy.get("dialog").should("not.exist");
    cy.get(".backdrop").should("not.exist");

    // Close using cancel button
    newTaskButton.click();
    cy.contains("Cancel").click();
    cy.get("dialog").should("not.exist");
    cy.get(".backdrop").should("not.exist");
  });

  it("should create a new task", () => {
    const title = "My new task";
    const summary = "Some description";

    cy.visit("http://localhost:5173");
    cy.get("button", { name: "New Task" }).click();
    cy.get("input[id='title']").type(title);
    cy.get("textarea[id='summary']").type(summary);
    cy.get("dialog").contains("Add Task").click();

    // No se puede reutilizar el selector porque se crea
    // una cadena y hace validaciones sobre el ultimo
    // elemento de la cadena
    cy.get(".task-list li").should("have.length", 1);
    cy.get(".task-list li h2").contains(title);
    cy.get(".task-list li p").contains(summary);
    cy.get("dialog").should("not.exist");
    cy.get(".backdrop").should("not.exist");
  });
});
