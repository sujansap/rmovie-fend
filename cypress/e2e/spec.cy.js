describe("Login", () => {
  it("should be running", () => {
    cy.visit("http://localhost:5173");
  });

  it("should do login", () => {
    cy.login("janadmin@gmail.com", "verydifficult");
  });
});
