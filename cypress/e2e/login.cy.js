import HomePage from "../pages/HomePage";
import Login from "../pages/LoginPage";

describe("Login Flow", () => {
  let userdata;

  before(() => {
    cy.fixture("createduser").then((data) => {
      userdata = data;
    });
  });

  beforeEach(() => {
    HomePage.visit();
  });

  it("should log in with valid credentials and display the username", () => {
    HomePage.openLoginModal();
    Login.login(userdata.username, userdata.password);
    HomePage.assertLoggedIn(userdata.username);
    HomePage.assertLogoutVisible();
  });

  it("should show an alert when the password is incorrect", () => {
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.include("Wrong password");
    });

    HomePage.openLoginModal();
    Login.login(userdata.username, "Password");
  });

  it("should show an alert when the username does not exist", () => {
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.include("User does not exist");
    });

    HomePage.openLoginModal();
    Login.login("user1", "Password");
  });
});
