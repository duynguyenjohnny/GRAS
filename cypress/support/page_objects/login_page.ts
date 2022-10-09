class LoginPage {
  private path = "https://juice-shop.guardrails.ai/#/login";

  emailInput = () => cy.get("[id='email']");
  passwordInput = () => cy.get("[id='password']");
  loginButton = () => cy.get("[id='loginButton']");
  meWantItButton = () =>
    cy
      .get("div[class='cc-compliance']")
      .find("a")
      .contains("Me want it!")
      .should("be.visible");
  dismisstButton = () => cy.get('button:contains("Dismiss")');
  itemList = () => cy.get('button:contains("Add to Basket")');
  basketList = () => cy.get('mat-cell:contains(" Banana Juice (1000ml) ")');
  yourBasket = () => cy.get('button:contains(" Your Basket")');
  deleteButton = () => cy.get(".mat-button-wrapper");
  checkOutButton = () => cy.get("[id='checkoutButton']");
  addNewAddressButton = () => cy.get('button:contains("Add New Address")');
  addressFormList = () => cy.get("[id^='mat-input-']");
  address = () => cy.get("[id='address']");
  submitButton = () => cy.get("[id='submitButton']");

  loginGR() {
    cy.fixture("users").then((user) => {
      cy.visit("https://juice-shop.guardrails.ai/#/login");
      cy.get('button:contains("Dismiss")').click();
      cy.get("div[class='cc-compliance']")
        .find("a")
        .contains("Me want it!")
        .should("be.visible")
        .click();
      cy.get("[id='email']").clear().type(user.EMAIL);
      cy.get("[id='password']").type(user.PASSWORD);
      cy.get("[id='loginButton']").click();
      cy.wait(1000);
    });
  }

  addSingleItem() {
    this.itemList().eq(0).click();
    cy.wait(300);
  }

  clickCheckOut() {
    this.yourBasket().click();
    cy.wait(300);
    this.checkOutButton().click();
  }

  addNewAddress() {
    this.addNewAddressButton().click();
  }

  fillAddressForm() {
    this.addressFormList().eq(1).type("VN", { force: true });
    this.addressFormList().eq(2).type("JD", { force: true });
    this.addressFormList().eq(3).type("8899778", { force: true });
    this.addressFormList().eq(4).type("777", { force: true });
    this.address().type("SG");
    this.addressFormList().eq(5).type("888", { force: true });
    this.addressFormList().eq(6).type("HCM", { force: true });
  }

  addTwoItems() {
    this.addSingleItem();
    cy.wait(300);
    this.addSingleItem();
    cy.wait(300);
  }

  searchApple() {
    cy.visit("https://juice-shop.guardrails.ai/#/search?q=apple");
  }

  removeItemAdded() {
    this.yourBasket().click();
    cy.wait(300);
    this.deleteButton().eq(8).click();
  }

  remove2ItemsAdded() {
    this.removeItemAdded();
    cy.wait(1000);
    this.deleteButton().eq(8).click();
  }

  verifyApples() {
    this.itemList().should("have.length", "2");
    this.yourBasket().click();
    cy.wait(300);
    this.deleteButton().eq(8).click();
  }

  verifyOnlyOneItem() {
    cy.visit("https://juice-shop.guardrails.ai/#/login");
    this.emailInput().clear().type("kokonu101@gmail.com");
    this.passwordInput().clear().type("123456");
    this.loginButton().click();
    cy.wait(500);
    this.yourBasket().click();
    cy.wait(300);
    this.basketList().should("contains.text", " Banana Juice (1000ml) ");
    this.deleteButton().eq(8).click();
  }

  clickSubmit() {
    this.submitButton().click({ force: true });
  }
}

const loginPage = new LoginPage();
export default loginPage;
