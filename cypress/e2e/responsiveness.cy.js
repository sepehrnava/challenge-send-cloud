describe("Responsive Design Tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("VITE_PUBLIC_DEV_URL"));
  });

  const testElementsVisibility = (width, height, navVisible) => {
    cy.viewport(width, height);
    cy.get(".header").should("be.visible");
    cy.get(".hero").should("be.visible");
    cy.get(".intro").should("be.visible");
    cy.get(".range").should("be.visible");
    cy.get(".footer").should("be.visible");
    cy.get(".header__nav").should(navVisible ? "be.visible" : "not.be.visible");
    cy.get("#burger-menu").should(navVisible ? "not.be.visible" : "be.visible");
  };

  it("Should display correctly on mobile devices", () => {
    testElementsVisibility(375, 667, false); // iPhone 6
  });

  it("Should display correctly on tablet devices", () => {
    testElementsVisibility(768, 1024, true); // iPad 2
  });

  it("Should display correctly on desktop devices", () => {
    testElementsVisibility(1920, 1080, true); // Desktop
  });
});
