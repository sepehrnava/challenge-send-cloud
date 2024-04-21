describe("Speed Adjustment Tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("VITE_PUBLIC_DEV_URL"));
  });

  it("should increment the speed correctly", () => {
    cy.get("#speed-range")
      .invoke("attr", "style")
      .then((styleString) => {
        const match = /--number:\s*(\d+)/.exec(styleString);
        const initialSpeed = match ? parseInt(match[1]) : 0;
        cy.get("#speed-arrow-up").click();
        cy.get("#speed-range")
          .invoke("attr", "style")
          .should((newStyleString) => {
            const newMatch = /--number:\s*(\d+)/.exec(newStyleString);
            const newSpeed = newMatch ? parseInt(newMatch[1]) : 0;
            expect(newSpeed).to.eq(initialSpeed + 10);
          });
      });
  });

  it("should decrement the speed correctly", () => {
    cy.get("#speed-arrow-up").click();
    cy.get("#speed-range")
      .invoke("attr", "style")
      .then((styleString) => {
        const match = /--number:\s*(\d+)/.exec(styleString);
        const incrementedSpeed = match ? parseInt(match[1]) : 0;
        cy.get("#speed-arrow-down").click();
        cy.get("#speed-range")
          .invoke("attr", "style")
          .should((newStyleString) => {
            const newMatch = /--number:\s*(\d+)/.exec(newStyleString);
            const newSpeed = newMatch ? parseInt(newMatch[1]) : 0;
            expect(newSpeed).to.eq(incrementedSpeed - 10);
          });
      });
  });
});
