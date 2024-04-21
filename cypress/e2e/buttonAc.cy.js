describe("AC Button Toggle Tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("VITE_PUBLIC_DEV_URL"));
  });

  it("should toggle AC on and off correctly above 20 degrees", () => {
    cy.get("#temp-range")
      .invoke("attr", "style")
      .then((styleString) => {
        const match = /--number:\s*(\d+)/.exec(styleString);
        const temp = match ? parseInt(match[1]) : 0;
        if (temp < 20) {
          const clicks = (20 - temp) / 10 + 1;
          Array.from({ length: clicks }).forEach(() =>
            cy.get("#temp-arrow-up").click()
          );
        }
      });

    cy.get("#ac-btn").click();
    cy.get("#ac-btn-text").should("contain", "AC ON");

    cy.get("#ac-btn").click();
    cy.get("#ac-btn-text").should("contain", "AC OFF");
  });

  it("should toggle heat on and off correctly below 20 degrees", () => {
    cy.get("#temp-range")
      .invoke("attr", "style")
      .then((styleString) => {
        const match = /--number:\s*(\d+)/.exec(styleString);
        const temp = match ? parseInt(match[1]) : 0;
        if (temp >= 20) {
          const clicks = (temp - 20) / 10 + 1;
          Array.from({ length: clicks }).forEach(() =>
            cy.get("#temp-arrow-down").click()
          );
        }
      });

    cy.get("#ac-btn").click();
    cy.get("#ac-btn-text").should("contain", "HEAT ON");

    cy.get("#ac-btn").click();
    cy.get("#ac-btn-text").should("contain", "HEAT OFF");
  });
});
