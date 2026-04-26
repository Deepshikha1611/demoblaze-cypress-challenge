import HomePage from "../pages/HomePage";
import Login from "../pages/LoginPage";

describe("Login Flow", () => {
  // Variable to store credentials from fixture
  let userdata;

  // Load credentials created during signup test
  before(() => {
    // Load the dynamically created user credentials from createduser.json
    cy.fixture("createduser").then((data) => {
      userdata = data;
    });
  });

  // Navigate to home page before each test
  beforeEach(() => {
    HomePage.visit();
  });

  // Test for successful login with valid credentials
  it("should log in with valid credentials and display the username", () => {
    // Open the login modal
    HomePage.openLoginModal();
    // Submit login form with valid credentials from fixture
    Login.login(userdata.username, userdata.password);
    // Verify the user is logged in by checking username is displayed
    HomePage.assertLoggedIn(userdata.username);
    // Verify logout button is visible after successful login
    HomePage.assertLogoutVisible();
  });

  // Test for login with incorrect password
  it("should show an alert when the password is incorrect", () => {
    // Capture and verify the error alert message
    cy.on("window:alert", (alertText) => {
      // Assert that the "Wrong password" error is displayed
      expect(alertText).to.include("Wrong password");
    });

    // Open login modal
    HomePage.openLoginModal();
    // Attempt login with valid username but incorrect password
    Login.login(userdata.username, "Password");
  });

  // Test for login with non-existent user
  it("should show an alert when the username does not exist", () => {
    // Capture and verify the user not found alert message
    cy.on("window:alert", (alertText) => {
      // Assert that the "User does not exist" error is displayed
      expect(alertText).to.include("User does not exist");
    });

    // Open login modal
    HomePage.openLoginModal();
    // Attempt login with non-existent username
    Login.login("user1", "Password");
  });
});
