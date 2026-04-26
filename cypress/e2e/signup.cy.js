import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";

describe("Signup Flow", () => {
  let userdata;

  before(() => {
    cy.fixture("userdata").then((data) => {
      userdata = data;
    });
  });

  beforeEach(() => {
    HomePage.visit();
  });

  it("should create a new user successfully", () => {
    const username = `testuser_${Date.now()}`;
    const password = userdata.password;

    HomePage.navsignupLink.click();

    cy.on("window:alert", (text) => {
      expect(text).to.include("Sign up successful.");
    });

    SignupPage.signup(username, password);

    // Save credentials for login test
    cy.writeFile("cypress/fixtures/createduser.json", {
      username: username,
      password: password,
    });
  });
});
