describe("Loading Screen Tests", () => {
  it("should show loading screen", () => {
    cy.visit(Cypress.env("VITE_PUBLIC_DEV_URL"));
    cy.get("body").should("be.visible");
    cy.get("#hero-image")
      .should("be.visible")
      .then(($img) => {
        cy.wrap($img).should(($img) => {
          expect($img[0].complete && $img[0].naturalHeight !== 0).to.be.true;
        });
      });

    cy.get("#loading", { timeout: 5000 }).then(($loading) => {
      if ($loading && $loading.length > 0) {
        cy.get("#loading").should("not.have.class", "loading--active");
      }
    });
  });
});
