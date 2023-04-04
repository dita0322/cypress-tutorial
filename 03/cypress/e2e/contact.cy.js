describe("contact form", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about");
    cy.get("[data-cy='contact-input-message']").type("Hello World");
    cy.get("[data-cy='contact-input-name']").type("John Doe");
    cy.get("[data-cy='contact-input-email']").type("test@example.com");
    cy.get("[data-cy='contact-btn-submit']").as("submitBtn");
    cy.get("@submitBtn")
      .contains("Send Message")
      .and("not.have.attr", "disabled");
    cy.get("@submitBtn").click();
    cy.get("@submitBtn").contains("Sending...").should("have.attr", "disabled");
  });

  it("should submit the form with enter key", () => {
    cy.visit("http://localhost:5173/about");
    cy.get("[data-cy='contact-input-message']").type("Hello World");
    cy.get("[data-cy='contact-input-name']").type("John Doe");
    cy.get("[data-cy='contact-btn-submit']").as("submitBtn");
    cy.get("@submitBtn")
      .contains("Send Message")
      .and("not.have.attr", "disabled");

    // Otros comandos: https://docs.cypress.io/api/commands/type
    cy.get("[data-cy='contact-input-email']").type("test@example.com{enter}");
    cy.get("@submitBtn").contains("Sending...").should("have.attr", "disabled");
  });

  it("should validate the form input", () => {
    cy.visit("http://localhost:5173/about");
    cy.get("[data-cy='contact-btn-submit']").as("submitBtn");
    cy.get("[data-cy='contact-input-message']").as("inputMessage");
    cy.get("[data-cy='contact-input-name']").as("inputName");
    cy.get("[data-cy='contact-input-email']").as("inputEmail");
    cy.get("@submitBtn").click();
    cy.get("@submitBtn")
      .should("not.contain", "Sending...")
      .should("not.have.attr", "disabled");
    cy.get("@submitBtn").contains("Send Message");
    cy.get("@inputMessage").focus().blur();
    cy.get("@inputMessage")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);
    cy.get("@inputName").focus().blur();
    cy.get("@inputName")
      .parent()
      .should("have.attr", "class")
      .and("contains", "invalid");
    cy.get("@inputEmail").focus().blur();
    cy.get("@inputEmail")
      .parent()
      .should("have.attr", "class")
      .and("contains", "invalid");
  });
});
