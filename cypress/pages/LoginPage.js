class Login {
  // Login modal container element
  get loginLink() {
    return cy.get("#logInModal");
  }
  // Username input field in the login form
  get usernameInput() {
    return cy.get("#loginusername");
  }
  // Password input field in the login form
  get passwordInput() {
    return cy.get("#loginpassword");
  }
  // Login submit button
  get loginButton() {
    return cy.get('button[onclick="logIn()"]');
  }
  // Close button for the login modal dialog
  get closeButton() {
    return cy.get('#logInModal [data-dismiss="modal"]').first();
  }

  // Submit login form with username and password credentials
  login(username, password) {
    // Verify the login modal is visible before proceeding
    this.loginLink.should("be.visible");
    // Clear any existing text and type the username
    this.usernameInput.clear().type(username);
    // Clear any existing text and type the password
    this.passwordInput.clear().type(password);
    // Click the login submit button
    this.loginButton.click();
    return this;
  }
}

module.exports = new Login();
