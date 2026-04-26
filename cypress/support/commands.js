// Custom command for logging in via the UI
Cypress.Commands.add("login", (username, password) => {
  // Navigate to the home page
  cy.visit("/");
  // Click on the login link in navigation
  cy.get("#login2").click();
  // Wait for the login modal to appear
  cy.get("#logInModal").should("be.visible");
  // Clear and type the username in the login form
  cy.get("#loginusername").clear().type(username);
  // Clear and type the password in the login form
  cy.get("#loginpassword").clear().type(password);
  // Click the login/submit button
  cy.get("#logInModal .btn-primary").click();
  // Wait for the username to appear in the navigation (confirms successful login)
  cy.get("#nameofuser", { timeout: 10000 }).should("be.visible");
});

// Custom command for selecting the Laptops product category
Cypress.Commands.add("selectLaptopCategory", () => {
  // Click on the Laptops category link in the navigation
  cy.contains("a", "Laptops").click();
  // Wait for product cards to load after category selection
  cy.get(".card-title", { timeout: 15000 }).should("be.visible");
});
