describe("mijn eerste test", () => {
  it("draait de applicatie", () => {
    // 👈 1
    cy.visit("http://localhost:5173");
  });

  it(
    ("should login",
    () => {
      cy.login("janadmin@gmail.com", "verydifficult");
    })
  );
});
