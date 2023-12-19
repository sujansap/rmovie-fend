describe("Movie list", () => {
  beforeEach(() => {
    cy.login("janadmin@gmail.com", "verydifficult");
  });

  it("should show the movies", () => {
    cy.intercept("GET", "http://localhost:9000/api/movies", {
      fixture: "movies.json",
    });

    cy.visit("http://localhost:5173");
    cy.get("[data-cy=movie]").should("have.length", 1);
    cy.get("[data-cy=movie]").should("be.visible");

    cy.get("[data-cy=movie_image]").should("be.visible");

    cy.get("[data-cy=movie_title]").should("contain", "The Great Movie");
  });

  it("should show a loading indicator for a very slow response", () => {
    cy.intercept("http://localhost:9000/api/movies", (req) => {
      req.on("response", (res) => {
        res.setDelay(1000);
      });
    }).as("slowResponse");

    cy.visit("http://localhost:5173");
    cy.get("[data-cy=loader]").should("be.visible");
    cy.wait("@slowResponse");
    cy.get("[data-cy=loader]").should("not.exist");
  });

  it("should show an error if the API call fails", () => {
    cy.intercept("GET", "http://localhost:9000/api/movies", {
      statusCode: 500,
      body: {
        error: "Internal server error",
      },
    });
    cy.visit("http://localhost:5173");

    cy.get("[data-cy=axios_error_message").should("exist");
  });
});
