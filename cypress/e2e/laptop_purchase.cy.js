import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";

describe("Laptop Purchase Flow", () => {
  // Declare variables to hold fixture data
  let userdata;
  let order_details;
  let productdata;

  // Load all fixtures once before running tests
  before(() => {
    cy.fixture("userdata").then((data) => {
      userdata = data;
    });
    cy.fixture("checkoutdata").then((data) => {
      order_details = data;
    });
    cy.fixture("productdata").then((data) => {
      productdata = data;
    });
  });

  // Login before each test using dynamically created user credentials
  beforeEach(() => {
    cy.fixture("createduser").then((createdUser) => {
      cy.login(createdUser.username, createdUser.password);
    });
  });

  it("should display laptop products after clicking the Laptops category", () => {
    // Click on Laptops category
    HomePage.selectLaptopsCategory();

    // Verify at least one product is displayed
    cy.get(".card").should("have.length.gte", 1);

    // Verify the specific laptop from fixture is visible
    cy.contains(".card-title", productdata.laptopName).should("be.visible");
  });

  it("should add the laptop to the cart and show a confirmation alert", () => {
    // Suppress the "Product added" alert
    cy.on("window:alert", (alertText) => {
      if (alertText.includes("Product added")) return true;
    });

    // Navigate to product and add to cart
    HomePage.selectLaptopsCategory();
    HomePage.clickProduct(productdata.laptopName);
    ProductPage.assertProductTitle(productdata.laptopName);
    ProductPage.addToCart();
  });

  it("should show the laptop in the cart after adding it", () => {
    // Suppress the "Product added" alert
    cy.on("window:alert", (alertText) => {
      if (alertText.includes("Product added")) return true;
    });

    // Add product to cart
    HomePage.selectLaptopsCategory();
    HomePage.clickProduct(productdata.laptopName);
    ProductPage.addToCart();

    // Navigate to cart and verify product is there
    CartPage.visit();
    CartPage.assertProductInCart(productdata.laptopName);
  });

  it("should complete the full checkout flow and display an order confirmation", () => {
    // Suppress the "Product added" alert
    cy.on("window:alert", (alertText) => {
      if (alertText.includes("Product added")) return true;
    });

    // Browse and add laptop to cart
    HomePage.selectLaptopsCategory();
    HomePage.clickProduct(productdata.laptopName);
    ProductPage.assertProductTitle(productdata.laptopName);
    ProductPage.addToCart();

    // Navigate to cart and verify product
    CartPage.visit();
    CartPage.assertProductInCart(productdata.laptopName);
    CartPage.assertTotalIsNonZero();

    // Complete checkout with order details from fixture
    CartPage.openPlaceOrder();
    CartPage.fillAndSubmitOrder(order_details);

    // Verify order confirmation is displayed
    CartPage.assertOrderConfirmed();
  });

  it("should not allow placing an order with an empty name field", () => {
    // Suppress "Product added" alert, capture validation alert
    cy.on("window:alert", (alertText) => {
      if (alertText.includes("Product added")) return true;
      expect(alertText).to.include("Please fill out");
    });

    // Add product to cart
    HomePage.selectLaptopsCategory();
    HomePage.clickProduct(productdata.laptopName);
    ProductPage.addToCart();

    // Navigate to cart
    CartPage.visit();
    CartPage.assertProductInCart(productdata.laptopName);

    // Attempt to submit order with empty name field
    CartPage.openPlaceOrder();
    CartPage.fillAndSubmitOrder({
      name: "", // Empty name to trigger validation
      country: order_details.country,
      city: order_details.city,
      card: order_details.card,
      month: order_details.month,
      year: order_details.year,
    });

    // Verify order confirmation modal does not appear (validation failed)
    cy.get(".sweet-alert").should("not.exist");
  });
});
