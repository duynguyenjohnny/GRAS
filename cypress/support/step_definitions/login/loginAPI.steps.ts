import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../../page_objects/login_page";
import shareContext from "../../utils/shareContext";
import { ENUM_CONTEXT } from "../../enum/contextEnum";

Given("I login successfully with correct email and password by api", () => {
  const data = {
    email: "kokonu101@gmail.com",
    password: "123456",
    "content-type": "application/json; charset=utf-8",
  };
  cy.request("POST", "https://juice-shop.guardrails.ai/rest/user/login", data)
    .as("response_get_login_token")
    .then((resp) => {
      expect(resp.status).to.eq(200);
      cy.log(resp.status.toString());
      cy.log(resp["body"]["authentication"]["token"]);
      const login_token = resp["body"]["authentication"]["token"];
      cy.log(login_token);
      cy.wrap(login_token);
    });
});

When("I add 1 item to basket by api I should see the response code 200", () => {
  const bodyRequest = { ProductId: 1, BasketId: "13", quantity: 1 };
  cy.request({
    method: "POST",
    url: "https://juice-shop.guardrails.ai/rest/user/login",
    body: {
      email: "kokonu101@gmail.com",
      password: "123456",
    },
  }).then((resp) => {
    cy.log(JSON.stringify(resp));
    const token = resp["body"]["authentication"]["token"];
    shareContext.setContext(ENUM_CONTEXT.TOKEN, token);
    cy.log(resp["body"]["authentication"]["token"]);
    cy.request({
      method: "POST",
      url: "https://juice-shop.guardrails.ai/api/BasketItems/",
      headers: {
        Authorization: "Bearer " + resp["body"]["authentication"]["token"],
      },
      body: bodyRequest,
    }).as("response_get_basket_id");
  });
});

When(
  "I add 2 items to basket by api I should see the response code 200",
  () => {
    const bodyRequest = { ProductId: 1, BasketId: "13", quantity: 1 };
    const bodyRequest2 = { ProductId: 6, BasketId: "13", quantity: 1 };
    cy.request({
      method: "POST",
      url: "https://juice-shop.guardrails.ai/rest/user/login",
      body: {
        email: "kokonu101@gmail.com",
        password: "123456",
      },
    }).then((resp2) => {
      cy.log(JSON.stringify(resp2));
      const token = resp2["body"]["authentication"]["token"];
      shareContext.setContext(ENUM_CONTEXT.TOKEN2, token);
      cy.log(resp2["body"]["authentication"]["token"]);
      //add item 1
      cy.wait(1500);
      cy.request({
        method: "POST",
        url: "https://juice-shop.guardrails.ai/api/BasketItems/",
        headers: {
          Authorization: "Bearer " + resp2["body"]["authentication"]["token"],
        },
        body: bodyRequest,
      }).as("response_get_basket_id");
      //add item 2
      cy.request({
        method: "POST",
        url: "https://juice-shop.guardrails.ai/api/BasketItems/",
        headers: {
          Authorization: "Bearer " + resp2["body"]["authentication"]["token"],
        },
        body: bodyRequest2,
      }).as("response_get_basket_id2");
    });
    cy.get("@response_get_basket_id").then((response) => {
      cy.log(JSON.stringify(response));
      expect(response["status"]).to.eq(200);
      const basket_id = response["body"]["data"]["id"];
      shareContext.setContext(ENUM_CONTEXT.APPLE_ID, basket_id);
      cy.log(basket_id);
      cy.wrap(basket_id);
    });
  }
);

When("I delete 1 item", () => {
  const token = shareContext.getContext(ENUM_CONTEXT.TOKEN2);
  const id = shareContext.getContext(ENUM_CONTEXT.APPLE_ID);
  cy.request({
    method: "DELETE",
    url: `https://juice-shop.guardrails.ai/api/BasketItems/${id}`,
    headers: {
      Authorization: "Bearer " + token,
    },
    failOnStatusCode: false,
  });
});

Then("I validate only 1 item remains in the basket and I delete it", () => {
  loginPage.verifyOnlyOneItem();
});
