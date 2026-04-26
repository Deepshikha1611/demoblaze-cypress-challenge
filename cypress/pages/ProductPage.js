class ProductPage {
  get productTitle() {
    return cy.get(".name");
  }
  get productPrice() {
    return cy.get(".price-container");
  }
  get addToCartButton() {
    return cy.contains("a", "Add to cart");
  }

  addToCart() {
    this.addToCartButton.click();
    cy.wait(500);
    return this;
  }

  assertProductTitle(name) {
    this.productTitle.should("be.visible").and("contain", name);
    return this;
  }
}

module.exports = new ProductPage();
