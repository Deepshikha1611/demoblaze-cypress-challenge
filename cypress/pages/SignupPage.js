class SignupPage {
  // Signup modal container element
  get signupModal() {
    return cy.get("#signInModal");
  }

  // Username input field in the signup form
  get usernameInput() {
    return cy.get("#sign-username");
  }

  // Password input field in the signup form
  get passwordInput() {
    return cy.get("#sign-password");
  }

  // Signup submit button
  get signupButton() {
    return cy.get('button[onclick="register()"]');
  }

  // Close button for the signup modal dialog
  get closeButton() {
    return cy.get('#signInModal [data-dismiss="modal"]').first();
  }

  // Submit the signup form with username and password
  signup(username, password) {
    // Verify the signup modal is visible before proceeding
    this.signupModal.should("be.visible");
    // Clear any existing text and type the new username
    this.usernameInput.clear().type(username);
    // Clear any existing text and type the password
    this.passwordInput.clear().type(password);
    // Click the signup submit button to register the new user
    this.signupButton.click();

    return this;
  }
}

module.exports = new SignupPage();
