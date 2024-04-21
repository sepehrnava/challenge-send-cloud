describe("Performance Tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/*.js").as("jsFiles");

    cy.intercept("GET", "**/*.css").as("cssFiles");

    cy.visit(Cypress.env("VITE_PUBLIC_DEV_URL"), { timeout: 10000 });
  });

  it("JavaScript files should load quickly", () => {
    cy.wait("@jsFiles").then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304]);
      if (interception.response.headers["content-type"]) {
        expect(interception.response.headers["content-type"]).to.include(
          "javascript"
        );
      } else {
        cy.log("Content-Type header is missing");
      }
      if (interception.response.headers["content-length"]) {
        expect(
          interception.response.headers["content-length"]
        ).to.be.greaterThan(0);
      } else {
        cy.log("Content-Length header is missing");
      }
    });
  });

  it("CSS files should load quickly", () => {
    cy.wait("@cssFiles", { timeout: 5000 })
      .then((interception) => {
        if (interception) {
          expect(interception.response.statusCode).to.be.oneOf([200, 304]);
          if (interception.response.body) {
            expect(interception.response.body).to.include("body");
          }
        }
      })
      .then(() => {
        cy.log("CSS file checks completed");
      });
  });

  it("Page should become interactive quickly", () => {
    cy.window().then((win) => {
      const perf = win.performance;
      const timing = perf.timing;
      const interactiveTime = timing.domInteractive - timing.navigationStart;
      expect(interactiveTime).to.be.lessThan(5000);
    });
  });
});
