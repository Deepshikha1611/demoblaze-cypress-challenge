import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";

describe("Signup Flow", () => {
  // Variable to store fixture data
  let userdata;

  // Load fixtures once before running tests
  before(() => {
    // Load userdata fixture containing static test data
    cy.fixture("userdata").then((data) => {
      userdata = data;
    });
  });

  // Navigate to home page before each test
  beforeEach(() => {
    HomePage.visit();
  });

  // Test for successful user registration
  it("should create a new user successfully", () => {
    // Generate unique username using current timestamp
    const username = `testuser_${Date.now()}`;
    // Get password from fixture data
    const password = userdata.password;

    // Click on signup link from navigation
    HomePage.navsignupLink.click();

    // Capture and verify the success alert message
    cy.on("window:alert", (text) => {
      // Assert that the success message is displayed
      expect(text).to.include("Sign up successful.");
    });

    // Submit signup form with credentials
    SignupPage.signup(username, password);

    // Persist the newly created credentials to a fixture file for use in login tests
    cy.writeFile("cypress/fixtures/createduser.json", {
      username: username,
      password: password,
    });
  });
});
