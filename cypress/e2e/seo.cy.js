describe("SEO Compliance Tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("VITE_PUBLIC_DEV_URL"));
  });

  it("should have the correct page title", () => {
    cy.title().should("eq", "Tesla Range Calculator");
  });

  it("should have meta description and keywords", () => {
    cy.get('meta[name="description"]')
      .should("have.attr", "content")
      .and("not.be.empty");
    cy.get('meta[name="keywords"]')
      .should("have.attr", "content")
      .and("not.be.empty");
  });

  it("should have canonical link tag", () => {
    cy.get('link[rel="canonical"]')
      .should("have.attr", "href")
      .and("not.be.empty");
  });

  it("should ensure all images have alt attributes", () => {
    cy.get("img").each(($el) => {
      expect($el).to.have.attr("alt").and.not.be.empty;
    });
  });

  it("should use proper header tags", () => {
    cy.get("h1").should("exist").and("have.length", 1);
    cy.get("h2").should("exist");
  });

  it("should have non-empty title attributes in links for better accessibility", () => {
    cy.get("a[href]").each(($el) => {
      if ($el.prop("href").startsWith("http")) {
        expect($el).to.have.attr("title").and.not.be.empty;
      }
    });
  });

  it("should have social media meta tags for Open Graph and Twitter", () => {
    // Open Graph
    cy.get('meta[property="og:title"]')
      .should("have.attr", "content")
      .and("not.be.empty");
    cy.get('meta[property="og:description"]')
      .should("have.attr", "content")
      .and("not.be.empty");
    cy.get('meta[property="og:image"]')
      .should("have.attr", "content")
      .and("not.be.empty");
    cy.get('meta[property="og:url"]')
      .should("have.attr", "content")
      .and("not.be.empty");
    // Twitter
    cy.get('meta[name="twitter:title"]')
      .should("have.attr", "content")
      .and("not.be.empty");
    cy.get('meta[name="twitter:description"]')
      .should("have.attr", "content")
      .and("not.be.empty");
    cy.get('meta[name="twitter:image"]')
      .should("have.attr", "content")
      .and("not.be.empty");
  });
});
