describe("mijn eerste test", () => {
  it("draait de applicatie", () => {
    // 👈 1
    cy.visit("http://localhost:5173"); // 👈 2
  });
});
