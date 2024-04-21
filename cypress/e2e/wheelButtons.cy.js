describe("Wheel Size Selection Tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("VITE_PUBLIC_DEV_URL"));
  });

  it("should select 19-inch wheels and verify it is selected", () => {
    cy.get("#wheel-19").click();

    cy.get("#wheel-19").should("have.attr", "aria-checked", "true");
    cy.get("#wheel-19").should("have.class", "button--gray--active");

    cy.get("#wheel-21").should("have.attr", "aria-checked", "false");
    cy.get("#wheel-21").should("not.have.class", "button--gray--active");
  });

  it("should select 21-inch wheels and verify it is selected", () => {
    cy.get("#wheel-21").click();

    cy.get("#wheel-21").should("have.attr", "aria-checked", "true");
    cy.get("#wheel-21").should("have.class", "button--gray--active");

    cy.get("#wheel-19").should("have.attr", "aria-checked", "false");
    cy.get("#wheel-19").should("not.have.class", "button--gray--active");
  });
});
