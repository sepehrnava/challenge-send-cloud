describe("Menu Interactions on Mobile Devices", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");

    cy.visit(Cypress.env("VITE_PUBLIC_DEV_URL"));
  });

  it("Toggles the menu on small screens", () => {
    cy.get("#burger-menu").click();
    cy.get(".header__nav").should("have.class", "drawer-menu--active");

    cy.get("#burger-menu").click();
    cy.get(".header__nav").should("not.have.class", "drawer-menu--active");
  });

  it("Ensures navigation links exist and are clickable", () => {
    cy.get("#burger-menu").click();

    const linkTexts = ["MODEL S", "MODEL X", "MODEL 3", "ROADSTER", "ENERGY"];

    linkTexts.forEach((text) => {
      cy.get(".header__nav a").contains(text).should("be.visible").click();

    });
  });
});
