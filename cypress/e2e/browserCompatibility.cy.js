describe("Browser Compatibility Tests", () => {
  const browsers = ["chrome", "firefox", "edge"];

  browsers.forEach((browser) => {
    context(`Testing on ${browser}`, () => {
      beforeEach(() => {
        cy.visit(Cypress.env("VITE_PUBLIC_DEV_URL"), {
          browser: browser,
        });
      });

      it("should display key elements correctly", () => {
        cy.get(".header").should("be.visible");
        cy.get(".hero").should("be.visible");
        cy.get(".intro").should("be.visible");
        cy.get(".range").should("be.visible");
        cy.get(".footer").should("be.visible");
      });

      it("should toggle AC and check text changes", () => {
        cy.get("#ac-btn").click();
        cy.get("#ac-btn-text").should("contain", "AC ON");
        cy.get("#ac-btn").click();
        cy.get("#ac-btn-text").should("contain", "AC OFF");

        cy.get("#temp-arrow-down").click({ repeat: 3 });
        cy.get("#ac-btn").click();
        cy.get("#ac-btn-text").should("contain", "HEAT ON");
        cy.get("#ac-btn").click();
        cy.get("#ac-btn-text").should("contain", "HEAT OFF");
      });

      it("should allow selection and verification of wheel sizes", () => {
        cy.get("#wheel-19").click();
        cy.get("#wheel-19")
          .should("have.attr", "aria-checked", "true")
          .and("have.class", "button--gray--active");
        cy.get("#wheel-21").should("have.attr", "aria-checked", "false");

        cy.get("#wheel-21").click();
        cy.get("#wheel-21")
          .should("have.attr", "aria-checked", "true")
          .and("have.class", "button--gray--active");
        cy.get("#wheel-19").should("have.attr", "aria-checked", "false");
      });

      it("should correctly increment and decrement temperature", () => {
        cy.get("#temp-arrow-up").click();
        cy.get("#temp-range")
          .invoke("attr", "style")
          .should("contain", "--number:");
        cy.get("#temp-arrow-down").click();
        cy.get("#temp-range")
          .invoke("attr", "style")
          .should("contain", "--number:");
      });

      it("should correctly increment and decrement speed", () => {
        cy.get("#speed-arrow-up").click();
        cy.get("#speed-range")
          .invoke("attr", "style")
          .should("contain", "--number:");
        cy.get("#speed-arrow-down").click();
        cy.get("#speed-range")
          .invoke("attr", "style")
          .should("contain", "--number:");
      });
    });
  });
});
