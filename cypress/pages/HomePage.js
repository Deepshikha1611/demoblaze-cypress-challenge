class HomePage {
  get navsignupLink() {
    return cy.get("#signin2");
  }
  get navLoginLink() {
    return cy.get("#login2");
  }
  get navLogoutLink() {
    return cy.get("#logout2");
  }
  get navCartLink() {
    return cy.get("#cartur");
  }
  get navUsernameDisplay() {
    return cy.get("#nameofuser");
  }
  get laptopsCategory() {
    return cy.contains("a", "Laptops");
  }
  get productCards() {
    return cy.get(".card");
  }

  visit() {
    cy.visit("/");
    cy.get(".card-title", { timeout: 15000 }).should("be.visible");
    return this;
  }

  openLoginModal() {
    this.navLoginLink.click();
    cy.get("#logInModal").should("be.visible");
    return this;
  }

  selectLaptopsCategory() {
    this.laptopsCategory.click();

    cy.get(".card-title", { timeout: 15000 }).should("be.visible");
    return this;
  }

  clickProduct(name) {
    cy.contains(".card-title a", name).click();
    return this;
  }

  assertLoggedIn(username) {
    this.navUsernameDisplay.should("be.visible").and("contain", username);
    return this;
  }

  assertLogoutVisible() {
    this.navLogoutLink.should("be.visible");
    return this;
  }
}

module.exports = new HomePage();
