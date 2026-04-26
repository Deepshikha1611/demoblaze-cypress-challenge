class ProductPage {
  // Product title/name element on the product detail page
  get productTitle() {
    return cy.get(".name");
  }
  // Product price container element
  get productPrice() {
    return cy.get(".price-container");
  }
  // Add to cart button link element
  get addToCartButton() {
    return cy.contains("a", "Add to cart");
  }

  // Click the Add to Cart button and wait for the action to complete
  addToCart() {
    // Click the Add to Cart button
    this.addToCartButton.click();
    // Wait 500ms for the cart update/alert to appear
    cy.wait(500);
    return this;
  }

  // Verify the product title matches the expected name
  assertProductTitle(name) {
    // Check that the product title is visible and contains the expected product name
    this.productTitle.should("be.visible").and("contain", name);
    return this;
  }
}

module.exports = new ProductPage();
