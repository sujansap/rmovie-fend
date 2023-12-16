describe("Movie info", () => {
  beforeEach(() => {
    cy.login("janadmin@gmail.com", "verydifficult");
  });
  ``;

  it("should show full movie info for movie with id", () => {
    cy.intercept("GET", "http://localhost:9000/api/movies/41", {
      fixture: "movie_details.json",
    });

    cy.intercept("GET", "http://localhost:9000/api/movies/41/rating", {
      fixture: "movie_rating.json",
    });

    cy.visit("http://localhost:5173/movies/41");

    cy.get("[data-cy=movie_detail]").should("be.visible");
    cy.get("[data-cy=movie_detail]").should("contain", "The Great Movie");
    cy.get("[data-cy=movie_rating]").should("contain", "n/a");
  });

  it("should be able to see review form if there is no review", () => {
    //movies/${id}/review`
    cy.intercept("GET", "http://localhost:9000/api/movies/41/review", {
      statusCode: 404,
      body: {
        error: "Not Found",
        message: "Movie review not found",
      },
    });

    cy.visit("http://localhost:5173/movies/41/review");

    cy.get("[data-cy=review_input]").should("be.visible");
  });

  it("should be able to delete review if there is one", () => {
    cy.intercept("GET", "http://localhost:9000/api/movies/41/review", {
      fixture: "review.json",
    });

    cy.visit("http://localhost:5173/movies/41/review");

    cy.get("[data-cy=review_delete_btn]").click();

    cy.intercept("GET", "http://localhost:9000/api/movies/41/review", {
      statusCode: 404,
      body: {
        error: "Not Found",
        message: "Movie review not found",
      },
    });
  });
});
