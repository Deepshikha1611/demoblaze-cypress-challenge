class SignupPage {
  get signupModal() {
    return cy.get("#signInModal");
  }

  get usernameInput() {
    return cy.get("#sign-username");
  }

  get passwordInput() {
    return cy.get("#sign-password");
  }

  get signupButton() {
    return cy.get('button[onclick="register()"]');
  }

  get closeButton() {
    return cy.get('#signInModal [data-dismiss="modal"]').first();
  }

  signup(username, password) {
    this.signupModal.should("be.visible");
    this.usernameInput.clear().type(username);
    this.passwordInput.clear().type(password);
    this.signupButton.click();

    return this;
  }
}

module.exports = new SignupPage();
