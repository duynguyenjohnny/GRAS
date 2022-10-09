declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      api_login(email, password): Chainable<Response<any>>;
      api_login_successfully_and_set_tokens_globally(): Chainable<
        Response<any>
      >;
      api_add_single_item_to_basket(requestBody): Chainable<Response<any>>;
    }
  }
}
export const getBaseHeaders = () => {
  return {
    "content-type": "application/json; charset=utf-8",
  };
};

export const getHeadersGR = () => {
  return {
    ...getBaseHeaders(),
    authorization: `Bearer ${globalThis.APIJWTAccessToken}`,
  };
};

Cypress.Commands.add("api_login", (email, password) => {
  return cy.request({
    method: "POST",
    url: "https://juice-shop.guardrails.ai/rest/user/login",
    headers: getBaseHeaders(),
    body: { email: email, password: password },
    failOnStatusCode: false,
  });
});

// Cypress.Commands.add("api_login_successfully_and_set_tokens_globally", () => {
//   cy.api_login({ email: "kokonu101@email.com", password: "123456" }).then(
//     (response) => {
//       expect(response["status"], "Login").to.eq(200);
//       globalThis.APIJWTAccessToken =
//         response["body"]["authentication"]["token"];
//     }
//   );
// });

// Cypress.Commands.add("api_add_single_item_to_basket", (requestBody) => {
//   cy.request({
//     method: "POST",
//     url: "https://juice-shop.guardrails.ai/api/BasketItems/",
//     headers: getHeadersGR(),
//     body: requestBody,
//     failOnStatusCode: false,
//   }).as("APIResponse");
// });

Cypress.Commands.add("api_add_single_item_to_basket", (requestBody) => {
  cy.request({
    method: "POST",
    url: "https://juice-shop.guardrails.ai/rest/user/login",
    body: {
      email: "kokonu101@gmail.com",
      password: "123456",
    },
  }).then((resp) => {
    //cy.log(resp);
    cy.log(resp.body.token);
    cy.request({
      method: "POST",
      url: "https://juice-shop.guardrails.ai/api/BasketItems/",
      headers: { Authorization: "Bearer " + resp.body.token },
      body: requestBody,
    });
  });
});
