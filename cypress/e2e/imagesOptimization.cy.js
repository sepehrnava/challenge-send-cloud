describe("Performance Optimization Tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("VITE_PUBLIC_DEV_URL"));
  });

  it("Should have optimized images", () => {
    cy.get("img").each((img) => {
      cy.wrap(img).should("have.attr", "src");
      if (img.attr("srcset")) {
        const srcset = img.attr("srcset");
        expect(srcset).to.contain(".webp");
      }
    });
  });
});
