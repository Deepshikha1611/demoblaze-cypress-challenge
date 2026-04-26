class Login {
  get loginLink() {
    return cy.get("#logInModal");
  }
  get usernameInput() {
    return cy.get("#loginusername");
  }
  get passwordInput() {
    return cy.get("#loginpassword");
  }
  get loginButton() {
    return cy.get('button[onclick="logIn()"]');
  }
  get closeButton() {
    return cy.get('#logInModal [data-dismiss="modal"]').first();
  }

  login(username, password) {
    this.loginLink.should("be.visible");
    this.usernameInput.clear().type(username);
    this.passwordInput.clear().type(password);
    this.loginButton.click();
    return this;
  }
}

module.exports = new Login();
