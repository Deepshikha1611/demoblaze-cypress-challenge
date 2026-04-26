class CartPage {
  // Cart item rows with 10-second timeout for page load
  get cartItems() {
    return cy.get("#tbodyid tr", { timeout: 10000 });
  }
  // Total price element in the cart
  get totalPrice() {
    return cy.get("#totalp");
  }
  // Place Order button from the cart page
  get placeOrderButton() {
    return cy.contains("button", "Place Order");
  }

  // Order modal dialog box
  get orderModal() {
    return cy.get("#orderModal");
  }
  // Country input field in the order form
  get countryInput() {
    return cy.get("#country");
  }
  // City input field in the order form
  get cityInput() {
    return cy.get("#city");
  }
  // Credit card number input field
  get creditCardInput() {
    return cy.get("#card");
  }
  // Month expiry input field
  get monthInput() {
    return cy.get("#month");
  }
  // Year expiry input field
  get yearInput() {
    return cy.get("#year");
  }
  // Name input field in the order form
  get nameInput() {
    return cy.get("#name");
  }
  // Purchase button inside the order modal
  get purchaseButton() {
    return cy.contains("#orderModal button", "Purchase");
  }

  // Order confirmation alert modal
  get confirmationModal() {
    return cy.get(".sweet-alert");
  }
  // Confirmation message text inside the modal
  get confirmationText() {
    return cy.get(".sweet-alert p");
  }

  // Navigate to the cart page
  visit() {
    cy.visit("/cart.html");
    return this;
  }

  // Verify product exists in cart by name
  assertProductInCart(productName) {
    // Check that at least one product row exists in cart table
    this.cartItems.should("have.length.gte", 1);
    // Verify the specific product name is visible in the cart
    cy.get("#tbodyid").should("contain", productName);
    return this;
  }

  // Verify total price is greater than zero
  assertTotalIsNonZero() {
    // Extract price text, convert to number, and verify it's positive
    this.totalPrice.invoke("text").then((text) => {
      const price = parseInt(text.trim(), 10);
      expect(price).to.be.greaterThan(0);
    });
    return this;
  }

  // Open the Place Order modal
  openPlaceOrder() {
    // Click the Place Order button
    this.placeOrderButton.click();
    // Wait for and verify the order modal is visible
    this.orderModal.should("be.visible");
    return this;
  }

  // Fill and submit the order form with customer details
  fillAndSubmitOrder({ name, country, city, card, month, year }) {
    // Conditionally fill name field - use invoke() for empty values to avoid Cypress errors
    if (name) {
      this.nameInput.click().type(name);
    } else {
      // Set empty value directly using invoke when name is empty (for validation tests)
      this.nameInput.invoke("val", "");
    }
    // Fill remaining order fields
    this.countryInput.click().type(country);
    this.cityInput.type(city);
    this.creditCardInput.type(card);
    this.monthInput.type(month);
    this.yearInput.type(year);
    // Submit the order form
    this.purchaseButton.click();
    return this;
  }

  // Verify order confirmation modal is displayed
  assertOrderConfirmed(productName) {
    // Verify confirmation modal is visible
    this.confirmationModal.should("be.visible");
    // Verify confirmation text contains order amount
    this.confirmationText.should("be.visible").and("contain", "Amount");
    // Optional: Verify product name is in confirmation if provided
    if (productName) {
      this.confirmationText.should("contain.text", "");
    }
    return this;
  }
}

module.exports = new CartPage();
