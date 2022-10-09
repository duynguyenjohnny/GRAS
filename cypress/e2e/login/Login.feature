@login
Feature: User - Login

    As a user, I want to login into the system successful when I provide email and password.

    Background: As a user, I am able to login successful with valid email/password
        Given I am on the login page
        When I login with correct email and password
        Then I should see the search page

    @ui  @login
    Scenario: Login with your user, add 1 item to the basket, click on checkout, add a new address, fill in the address form, click on submit.
        When I add 1 item to the basket
        Then I click on checkout
        When I add a new address
        Then I fill in the address form
        Then I click on submit

    @ui  @login
    Scenario: Exact same flow, but this time, add two items to your basket, click on checkout, add a new address, fill in the address form, click on submit.
        When I add 2 items to the basket
        Then I click on checkout
        When I add a new address
        Then I fill in the address form
        Then I click on submit

    @ui  @login
    Scenario: Click on the search button, search for apple, verify that 2 apple products show up and that banana product doesn't show up
        When I search for apple
        Then I verify that 2 apple products show up and banana product doesn't show up

