import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../../page_objects/login_page";

Given("I am on the login page", () => {
  cy.visit("https://juice-shop.guardrails.ai/#/login");
});

When("I login with correct email and password", () => {
  loginPage.loginGR();
});

When("I add 1 item to the basket", () => {
  loginPage.addSingleItem();
});

When("I click on checkout", () => {
  loginPage.clickCheckOut();
});

When("I add a new address", () => {
  loginPage.addNewAddress();
});

When("I fill in the address form", () => {
  loginPage.fillAddressForm();
});

When("I add 2 items to the basket", () => {
  loginPage.addTwoItems();
});

Then("I click on submit", () => {
  loginPage.clickSubmit();
});

Then("I remove item added", () => {
  loginPage.removeItemAdded();
});

Then("I remove 2 item added", () => {
  loginPage.remove2ItemsAdded();
});

Then("I should see the search page", () => {
  cy.url().should("eq", "https://juice-shop.guardrails.ai/#/search");
});

Then("I search for apple", () => {
  loginPage.searchApple();
});

Then(
  "I verify that 2 apple products show up and banana product doesn't show up",
  () => {
    loginPage.verifyApples();
  }
);
