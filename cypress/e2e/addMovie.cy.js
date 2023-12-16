describe("Add movie", () => {
  beforeEach(() => {
    cy.login("janadmin@gmail.com", "verydifficult");
  });
  it("should submit the form with valid data", () => {
    cy.visit("http://localhost:5173/movies/add");

    cy.get("[data-cy=title_input]").type("The Great Movie");
    cy.get("[data-cy=synopsis_input]").type(
      "This is an amazing movie about..."
    );

    const genresToAdd = ["Action", "Comedy"];
    genresToAdd.forEach((genre) => {
      cy.get("[data-cy=genres_input]").type(`${genre}{enter}`);
    });

    cy.get("[data-cy=poster_input]").type(
      "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg"
    );

    cy.get("[data-cy=submit_btn]").click();

    cy.get("[data-cy=added_message]").should("be.visible");
    cy.get("[data-cy=added_message]")
      .contains("Movie added successfully!")
      .should("exist");
  });

  it("should show the error message for an invalid genre", () => {
    cy.visit("http://localhost:5173/movies/add");

    cy.get("[data-cy=genres_input]").type(`invalid{enter}`);

    cy.get("[data-cy=label_input_error]").contains(
      "This is not a valid genre!"
    );
  });

  it("should show the error message for less than 5 char synopsis", () => {
    cy.visit("http://localhost:5173/movies/add");

    cy.get("[data-cy=title_input]").type("The Great Movie");
    cy.get("[data-cy=synopsis_input]").type("abc");

    cy.get("[data-cy=submit_btn]").click();
    cy.get("[data-cy=label_input_error]").contains("Minimum 5 characters");
  });
});
