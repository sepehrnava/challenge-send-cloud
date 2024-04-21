describe("Temperature Adjustment Tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("VITE_PUBLIC_DEV_URL"));
  });

  it("should increment the temperature correctly", () => {
    cy.get("#temp-range")
      .invoke("attr", "style")
      .then((styleString) => {
        const match = /--number:\s*(\d+)/.exec(styleString);
        const initialTemp = match ? parseInt(match[1]) : 0;
        cy.get("#temp-arrow-up").click();
        cy.get("#temp-range")
          .invoke("attr", "style")
          .should((newStyleString) => {
            const newMatch = /--number:\s*(\d+)/.exec(newStyleString);
            const newTemp = newMatch ? parseInt(newMatch[1]) : 0;
            expect(newTemp).to.eq(initialTemp + 10);
          });
      });
  });

  it("should decrement the temperature correctly", () => {
    cy.get("#temp-arrow-up").click();
    cy.get("#temp-range")
      .invoke("attr", "style")
      .then((styleString) => {
        const match = /--number:\s*(\d+)/.exec(styleString);
        const incrementedTemp = match ? parseInt(match[1]) : 0;
        cy.get("#temp-arrow-down").click();
        cy.get("#temp-range")
          .invoke("attr", "style")
          .should((newStyleString) => {
            const newMatch = /--number:\s*(\d+)/.exec(newStyleString);
            const newTemp = newMatch ? parseInt(newMatch[1]) : 0;
            expect(newTemp).to.eq(incrementedTemp - 10);
          });
      });
  });
});
