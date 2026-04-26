import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";

describe("Laptop Purchase Flow", () => {
  let userdata;
  let order_details;
  let productdata;

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

  beforeEach(() => {
    cy.fixture("createduser").then((createdUser) => {
      cy.login(createdUser.username, createdUser.password);
    });
  });

  it("should display laptop products after clicking the Laptops category", () => {
    HomePage.selectLaptopsCategory();

    cy.get(".card").should("have.length.gte", 1);
    cy.contains(".card-title", productdata.laptopName).should("be.visible");
  });

  it("should add the laptop to the cart and show a confirmation alert", () => {
    cy.on("window:alert", (alertText) => {
      if (alertText.includes("Product added")) return true;
    });

    HomePage.selectLaptopsCategory();
    HomePage.clickProduct(productdata.laptopName);
    ProductPage.assertProductTitle(productdata.laptopName);
    ProductPage.addToCart();
  });

  it("should show the laptop in the cart after adding it", () => {
    cy.on("window:alert", (alertText) => {
      if (alertText.includes("Product added")) return true;
    });

    HomePage.selectLaptopsCategory();
    HomePage.clickProduct(productdata.laptopName);
    ProductPage.addToCart();

    CartPage.visit();
    CartPage.assertProductInCart(productdata.laptopName);
  });

  it("should complete the full checkout flow and display an order confirmation", () => {
    cy.on("window:alert", (alertText) => {
      if (alertText.includes("Product added")) return true;
    });

    HomePage.selectLaptopsCategory();
    HomePage.clickProduct(productdata.laptopName);
    ProductPage.assertProductTitle(productdata.laptopName);
    ProductPage.addToCart();

    CartPage.visit();
    CartPage.assertProductInCart(productdata.laptopName);
    CartPage.assertTotalIsNonZero();

    CartPage.openPlaceOrder();
    CartPage.fillAndSubmitOrder(order_details);

    CartPage.assertOrderConfirmed();
  });

  it("should not allow placing an order with an empty name field", () => {
    cy.on("window:alert", (alertText) => {
      if (alertText.includes("Product added")) return true;
      expect(alertText).to.include("Please fill out");
    });

    HomePage.selectLaptopsCategory();
    HomePage.clickProduct(productdata.laptopName);
    ProductPage.addToCart();

    CartPage.visit();
    CartPage.assertProductInCart(productdata.laptopName);

    CartPage.openPlaceOrder();
    CartPage.fillAndSubmitOrder({
      name: "", // Empty name to trigger validation
      country: order_details.country,
      city: order_details.city,
      card: order_details.card,
      month: order_details.month,
      year: order_details.year,
    });

    cy.get(".sweet-alert").should("not.exist");
  });
});
