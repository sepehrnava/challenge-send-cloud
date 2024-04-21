describe("Environment Variables", () => {
  it("should have access to environment variables", () => {
    expect(Cypress.env("VITE_PUBLIC_DEV_URL")).to.eq("http://localhost:4173");
  });
});
