class CartPage {
  get cartItems() {
    return cy.get("#tbodyid tr", { timeout: 10000 });
  }
  get totalPrice() {
    return cy.get("#totalp");
  }
  get placeOrderButton() {
    return cy.contains("button", "Place Order");
  }

  get orderModal() {
    return cy.get("#orderModal");
  }
  get countryInput() {
    return cy.get("#country");
  }
  get cityInput() {
    return cy.get("#city");
  }
  get creditCardInput() {
    return cy.get("#card");
  }
  get monthInput() {
    return cy.get("#month");
  }
  get yearInput() {
    return cy.get("#year");
  }
  get nameInput() {
    return cy.get("#name");
  }
  get purchaseButton() {
    return cy.contains("#orderModal button", "Purchase");
  }

  get confirmationModal() {
    return cy.get(".sweet-alert");
  }
  get confirmationText() {
    return cy.get(".sweet-alert p");
  }

  visit() {
    cy.visit("/cart.html");
    return this;
  }

  assertProductInCart(productName) {
    this.cartItems.should("have.length.gte", 1);
    cy.get("#tbodyid").should("contain", productName);
    return this;
  }

  assertTotalIsNonZero() {
    this.totalPrice.invoke("text").then((text) => {
      const price = parseInt(text.trim(), 10);
      expect(price).to.be.greaterThan(0);
    });
    return this;
  }

  openPlaceOrder() {
    this.placeOrderButton.click();
    this.orderModal.should("be.visible");
    return this;
  }

  fillAndSubmitOrder({ name, country, city, card, month, year }) {
    if (name) {
      this.nameInput.click().type(name);
    } else {
      this.nameInput.invoke("val", ""); // Set empty value
    }
    this.countryInput.click().type(country);
    this.cityInput.type(city);
    this.creditCardInput.type(card);
    this.monthInput.type(month);
    this.yearInput.type(year);
    this.purchaseButton.click();
    return this;
  }

  assertOrderConfirmed(productName) {
    this.confirmationModal.should("be.visible");
    this.confirmationText.should("be.visible").and("contain", "Amount");
    if (productName) {
      this.confirmationText.should("contain.text", "");
    }
    return this;
  }
}

module.exports = new CartPage();
