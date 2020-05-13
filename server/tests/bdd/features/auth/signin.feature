Feature: Signin

Scenario: Signin with success
   Given i have an account
    When i send my email and password
    Then i will receive a token

Scenario: Signin with wrong email
   Given i have an account
    When i send a wrong email and correct password
    Then i will not receive a token

Scenario: Signin with wrong password
   Given i have an account
    When i send a correct email and wrong password
    Then i will not receive a token

Scenario: Signin with invalid email
   Given i have an account
    When i send an invalid email and password
    Then i will not receive a token

Scenario: Signin with password less than 4 digits
   Given i have an account
    When i send my email and password with 3 digits
    Then i will not receive a token