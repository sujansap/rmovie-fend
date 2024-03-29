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

  it("should delete the movie if it's made by the one who wants to delete", () => {
    cy.intercept("GET", "http://localhost:9000/api/movies/41", {
      fixture: "movie_details.json",
    });

    cy.intercept("GET", "http://localhost:9000/api/movies/41/rating", {
      fixture: "movie_rating.json",
    });

    cy.visit("http://localhost:5173/movies/41");

    cy.get("[data-cy=movie_detail]").should("contain", "The Great Movie");
    cy.get("[data-cy=movie_rating]").should("contain", "n/a");

    cy.intercept("DELETE", "http://localhost:9000/api/movies/41", {
      statusCode: 204,
      body: {},
    });

    cy.get("[data-cy=movie_delete_btn]").click();
    cy.get("[data-cy=movie]").should("be.visible");
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

  it("should be able to see review if there is one, then go to other user who hasn't made a review to see if review form is shown", () => {
    cy.intercept("GET", "http://localhost:9000/api/movies/41/review", {
      fixture: "review.json",
    }).as("getReview");

    cy.visit("http://localhost:5173/movies/41/review");
    cy.wait("@getReview");

    cy.get("[data-cy=review_delete_btn]").should("be.visible");

    cy.get("[data-cy=logout_btn]").click();

    cy.login("januser@gmail.com", "verydifficult");
    cy.intercept("GET", "http://localhost:9000/api/movies/41/review", {
      fixture: "empty_review.json",
    });
    cy.visit("http://localhost:5173/movies/41/review");
    cy.get("[data-cy=review_input]").should("be.visible");
  });

  it("should show a loading indicator for a very slow response", () => {
    cy.intercept("GET", "http://localhost:9000/api/movies/41/review", {
      fixture: "review.json",
    }).as("getReview");

    cy.intercept("http://localhost:9000/api/movies/41/review", (req) => {
      req.on("response", (res) => {
        res.setDelay(1000);
      });
    }).as("slowResponse");

    cy.visit("http://localhost:5173/movies/41/review");
    cy.get("[data-cy=loader]").should("be.visible");
    cy.wait("@slowResponse");
    cy.wait("@getReview");
    cy.get("[data-cy=loader]").should("not.exist");
  });
});
