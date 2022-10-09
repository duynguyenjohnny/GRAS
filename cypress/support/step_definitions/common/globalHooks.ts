import { After } from "@badeball/cypress-cucumber-preprocessor";

After({ tags: "@hook-remove-last-item-add" }, () => {
  const token = cy.getLocalStorage("LocalStorageToken");
  const id = cy.getLocalStorage("LocalStorageBasketId");
  cy.log(id.toString());
  cy.log(token.toString());
  cy.request({
    method: "DELETE",
    url: `https://juice-shop.guardrails.ai/api/BasketItems/${id}`,
    headers: {
      Authorization: "Bearer " + token,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response["status"]).to.eq(200);
  });
});
