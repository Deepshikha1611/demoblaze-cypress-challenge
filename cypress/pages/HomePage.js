class HomePage {
  // Navigation signup link element
  get navsignupLink() {
    return cy.get("#signin2");
  }
  // Navigation login link element
  get navLoginLink() {
    return cy.get("#login2");
  }
  // Navigation logout link element
  get navLogoutLink() {
    return cy.get("#logout2");
  }
  // Navigation cart link element
  get navCartLink() {
    return cy.get("#cartur");
  }
  // Display element showing logged-in username
  get navUsernameDisplay() {
    return cy.get("#nameofuser");
  }
  // Laptops category link in the product menu
  get laptopsCategory() {
    return cy.contains("a", "Laptops");
  }
  // All product card elements on the page
  get productCards() {
    return cy.get(".card");
  }

  // Navigate to the home page and wait for products to load
  visit() {
    // Visit the home page
    cy.visit("/");
    // Wait for product cards to be visible with 15-second timeout
    cy.get(".card-title", { timeout: 15000 }).should("be.visible");
    return this;
  }

  // Open the login modal dialog
  openLoginModal() {
    // Click on the login link
    this.navLoginLink.click();
    // Wait for the login modal to appear
    cy.get("#logInModal").should("be.visible");
    return this;
  }

  // Click on Laptops category to filter products
  selectLaptopsCategory() {
    // Click the Laptops category link
    this.laptopsCategory.click();

    // Wait for filtered product cards to load
    cy.get(".card-title", { timeout: 15000 }).should("be.visible");
    return this;
  }

  // Click on a specific product by name
  clickProduct(name) {
    // Click the product link by matching the card title text
    cy.contains(".card-title a", name).click();
    return this;
  }

  // Verify user is logged in by checking username display
  assertLoggedIn(username) {
    // Verify username element is visible and contains the expected username
    this.navUsernameDisplay.should("be.visible").and("contain", username);
    return this;
  }

  // Verify logout button is visible (indicates user is logged in)
  assertLogoutVisible() {
    // Check that logout link is visible in navigation
    this.navLogoutLink.should("be.visible");
    return this;
  }
}

module.exports = new HomePage();
