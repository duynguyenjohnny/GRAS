@login
Feature: User - Login

    As a user, I want to login into the system successful when I provide email and passwor by api

    @api  @login
    Scenario: Sign in the user, add 1 item to the basket, verify that 1 item is in the basket
        Given I login successfully with correct email and password by api
        When I add 1 item to basket by api I should see the response code 200

    @api  @login
    Scenario: Same as previous scenario but add 2 items instead of 1 to the basket
        Given I am on the login page
        When I login with correct email and password
        Then I should see the search page
        Then I remove item added
        When I add 2 items to basket by api I should see the response code 200

    @api  @login
    Scenario: Same as previous scenario but delete 1 item and validate that only 1 item remains in the basket
        Given I am on the login page
        When I login with correct email and password
        Then I should see the search page
        Then I remove 2 item added
        When I add 2 items to basket by api I should see the response code 200
        When I delete 1 item
        Then I validate only 1 item remains in the basket and I delete it
