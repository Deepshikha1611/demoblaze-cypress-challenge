Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");
  cy.get("#login2").click();
  cy.get("#logInModal").should("be.visible");
  cy.get("#loginusername").clear().type(username);
  cy.get("#loginpassword").clear().type(password);
  cy.get("#logInModal .btn-primary").click();
  cy.get("#nameofuser", { timeout: 10000 }).should("be.visible");
});

Cypress.Commands.add("selectLaptopCategory", () => {
  cy.contains("a", "Laptops").click();
  cy.get(".card-title", { timeout: 15000 }).should("be.visible");
});
