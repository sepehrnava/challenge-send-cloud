describe("Accessibility Tests for Tesla Range Calculator", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("VITE_PUBLIC_DEV_URL"));
    cy.injectAxe();
  });

  it("checks for accessibility violations on load", () => {
    cy.checkA11y(null, {}, (violations) => {
      violations.forEach((violation) => {
        cy.log(`Violation: ${violation.id}`);
        violation.nodes.forEach((node) => {
          cy.log(`Element: ${node.target}`);
          cy.log(`Message: ${node.failureSummary}`);
        });
      });
    });
  });

  it("header should have no accessibility violations", () => {
    cy.get("header").checkA11y();
  });

  it("main content should have no accessibility violations", () => {
    cy.get("main").checkA11y();
  });

  it("footer should have no accessibility violations", () => {
    cy.get("footer").checkA11y();
  });

  it("ensures interactive elements are accessible", () => {
    cy.get("input, button, select, a").each(($el) => {
      cy.wrap($el).should("have.attr", "aria-label").and("not.be.empty");
    });
  });

  it("ensures images have alt attributes", () => {
    cy.get("img").each(($el) => {
      cy.wrap($el).should("have.attr", "alt").and("not.be.empty");
    });
  });

  it("validates proper role attributes", () => {
    cy.get('[role="banner"]').should("exist");
    cy.get('[role="main"]').should("exist");
    cy.get('[role="contentinfo"]').should("exist");
  });

  it("ensures semantic use of HTML elements", () => {
    cy.get("header").should("exist");
    cy.get("nav").should("exist");
    cy.get("main").should("exist");
    cy.get("footer").should("exist");
    cy.get("article").should("exist");
    cy.get("section").should("exist");
  });
});
