/// <reference types="cypress" />
context("Viewport", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("VITE_PUBLIC_DEV_URL"));
  });

  it("cy.viewport() - set the viewport size and dimension", () => {
    cy.get("#header").should("be.visible");
    cy.viewport(320, 480);

    cy.viewport(2999, 2999);

    cy.viewport("macbook-15");
    cy.wait(200);
    cy.viewport("macbook-13");
    cy.wait(200);
    cy.viewport("macbook-11");
    cy.wait(200);
    cy.viewport("ipad-2");
    cy.wait(200);
    cy.viewport("ipad-mini");
    cy.wait(200);
    cy.viewport("iphone-6+");
    cy.wait(200);
    cy.viewport("iphone-6");
    cy.wait(200);
    cy.viewport("iphone-5");
    cy.wait(200);
    cy.viewport("iphone-4");
    cy.wait(200);
    cy.viewport("iphone-3");
    cy.wait(200);

    cy.viewport("ipad-2", "portrait");
    cy.wait(200);
    cy.viewport("iphone-4", "landscape");
    cy.wait(200);
  });
});
